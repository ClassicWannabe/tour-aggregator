import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as lodash from 'lodash';
import { CreateTourDto } from './dto/create-tour.dto';
import { UpdateTourDto } from './dto/update-tour.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { FindAllToursDto } from './dto/find-all-tours.dto';
import { MemoryStoredFile } from 'nestjs-form-data';
import { FileManagerService } from '../file-manager/file-manager.service';
import { Prisma, TourType } from '@prisma/client';
import { SEARCH_SIMILARITY_MIN_THRESHOLD } from './constants';
import { RecurringTourService } from './recurring-tour.service';
import { LocationService } from '../location/location.service';
import { BookTourDto } from './dto/book-tour.dto';
import { MailerService } from 'src/mailer/mailer.service';
import { FindAllTourReservationsDto } from 'src/api/tours/dto/find-all-tour-reservations.dto';

@Injectable()
export class ToursService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly fileManagerService: FileManagerService,
    private readonly recurringTourService: RecurringTourService,
    private readonly locationService: LocationService,
    private readonly mailerService: MailerService,
  ) {}

  async createTour(createTourDto: CreateTourDto, supplierId: string) {
    const {
      photoIds,
      recurrenceDates: rawRecurrenceDates,
      startDate,
      endDate,
      ...tourInfo
    } = createTourDto;
    const recurrenceDates = rawRecurrenceDates.map((date) => new Date(date));
    const tourDates = this.generateTourDatesFromRecurrence(
      { startDate, endDate },
      recurrenceDates,
    );

    const createdTour = await this.prismaService.$transaction(async (tx) => {
      const photos = await tx.tourPhoto.findMany({
        select: { id: true },
        where: {
          id: { in: photoIds },
          supplierId,
          tourId: null,
        },
      });
      if (photos.length !== photoIds.length) {
        throw new BadRequestException('Wrong user photo input');
      }
      await Promise.all(
        photoIds.map((photoId, idx) =>
          tx.tourPhoto.update({
            where: { id: photoId },
            data: {
              order: idx + 1,
            },
          }),
        ),
      );

      return tx.tour.create({
        data: {
          supplierId,
          photos: {
            connect: photoIds.map((photoId) => ({ id: photoId })),
          },
          dates: {
            createMany: { data: tourDates },
          },
          ...tourInfo,
        },
        include: { photos: true },
      });
    });

    return createdTour;
  }

  private generateTourDatesFromRecurrence(
    initialDates: Pick<CreateTourDto, 'startDate' | 'endDate'>,
    recurrenceDates: Date[],
    includeInitialDates = true,
  ): Prisma.TourDateCreateManyTourInput[] {
    return this.recurringTourService.generateRecurringDates(
      initialDates.startDate,
      initialDates.endDate,
      recurrenceDates,
      includeInitialDates,
    );
  }

  async uploadPhoto(photo: MemoryStoredFile, supplierId: string) {
    const uploadedPhoto = await this.fileManagerService.uploadPhoto({
      photo,
      supplierId,
    });

    return this.prismaService.tourPhoto.create({
      data: {
        supplierId,
        originalStorageLink: uploadedPhoto.original.url,
        originalStorageKey: uploadedPhoto.original.key,
        compressedMediumStorageLink: uploadedPhoto.medium.url,
        compressedMediumStorageKey: uploadedPhoto.medium.key,
        compressedPreviewStorageLink: uploadedPhoto.preview.url,
        compressedPreviewStorageKey: uploadedPhoto.preview.key,
      },
      select: {
        id: true,
        originalStorageLink: true,
        compressedMediumStorageLink: true,
        compressedPreviewStorageLink: true,
      },
    });
  }

  async deletePhoto(photoId: string, supplierId: string) {
    const tourPhoto = await this.prismaService.tourPhoto.findUnique({
      where: { id: photoId, supplierId },
    });
    if (!tourPhoto) {
      throw new NotFoundException(`Couldn't find tour photo by ID: ${photoId}`);
    }
    const photoUrls = this.extractPhotoUrls([tourPhoto]);
    await this.fileManagerService.deleteFilesByUrl(photoUrls);

    return this.prismaService.tourPhoto.delete({ where: { id: photoId } });
  }

  async findAllTours(query: FindAllToursDto) {
    const whereClauses = this.constructFindAllWhereClauses(query);

    const tours = await this.prismaService.tour.similarity({
      ...whereClauses,
      select: ['id'],
      take: query.limit,
      skip: query.offset,
    });
    const tourIds = tours.map((tour) => tour.id);
    if (!tourIds.length) {
      return [];
    }

    return this.prismaService.tour.findMany({
      where: {
        id: { in: tourIds },
        dates: { some: { startDate: { gt: new Date() } } },
      },
      include: {
        photos: { orderBy: { order: 'asc' } },
        dates: { orderBy: { startDate: 'asc' }, take: 2 },
      },
    });
  }

  private constructFindAllWhereClauses(query: FindAllToursDto) {
    const whereSimilarity = query.search
      ? ({
          title: {
            word_similarity: {
              text: query.search,
              threshold: { gte: SEARCH_SIMILARITY_MIN_THRESHOLD },
              order: 'desc',
            },
          },
          thesis: {
            word_similarity: {
              text: query.search,
              threshold: { gte: SEARCH_SIMILARITY_MIN_THRESHOLD },
              order: 'desc',
            },
          },
          description: {
            word_similarity: {
              text: query.search,
              threshold: { gte: SEARCH_SIMILARITY_MIN_THRESHOLD },
              order: 'desc',
            },
          },
        } as const)
      : undefined;

    const whereRaw: string[] = [`"archivedAt" is null`];
    if (query.locationId) {
      whereRaw.push(`"locationId" = '${query.locationId}'`);
    }
    if (query.minPricePerPerson) {
      whereRaw.push(`"pricePerPerson" >= ${query.minPricePerPerson}`);
    }
    if (query.maxPricePerPerson) {
      whereRaw.push(`"pricePerPerson" <= ${query.maxPricePerPerson}`);
    }
    if (query.type && query.type.length > 0) {
      whereRaw.push(`"type" IN (${query.type.map((type) => `'${type}'`)})`);
    }

    return { whereRaw, whereSimilarity };
  }

  async getTourFilters() {
    const [pricesRaw, locations] = await Promise.all([
      this.prismaService.tour.aggregate({
        _min: {
          pricePerPerson: true,
        },
        _max: {
          pricePerPerson: true,
        },
      }),
      this.locationService.getLocations(),
    ]);
    const prices = {
      min: pricesRaw._min.pricePerPerson ?? 0,
      max: pricesRaw._max.pricePerPerson ?? 0,
    };
    const types = Object.values(TourType);

    return { prices, types, locations };
  }

  async findOneTour(id: string) {
    try {
      return await this.prismaService.tour.findFirstOrThrow({
        include: {
          photos: true,
          location: true,
          dates: true,
        },
        where: { id },
      });
    } catch (e) {
      throw new NotFoundException(`Tour not found by ID: ${id}`);
    }
  }

  async bookTour(bookTourDto: BookTourDto) {
    const tourDate = await this.prismaService.tourDate.findUnique({
      where: {
        id: bookTourDto.dateId,
        tour: { archivedAt: null },
        startDate: { gt: new Date() },
      },
      select: { id: true },
    });

    if (!tourDate) {
      throw new NotFoundException('Tour date not found');
    }

    const createdReservation = await this.prismaService.tourReservation.create({
      data: {
        email: bookTourDto.email,
        phoneNumber: bookTourDto.phone,
        name: bookTourDto.name,
        tourDate: { connect: { id: tourDate.id } },
      },
      select: {
        tourDate: {
          select: {
            startDate: true,
            endDate: true,
            tour: {
              select: { supplier: { select: { email: true } } },
            },
          },
        },
      },
    });

    const tourDates = {
      startDate: createdReservation.tourDate.startDate,
      endDate: createdReservation.tourDate.endDate,
    };

    await Promise.all([
      this.mailerService.sendClientTourReservationEmail(
        bookTourDto.email,
        tourDates,
      ),
      this.mailerService.sendSupplierTourReservation(
        createdReservation.tourDate.tour.supplier.email!,
        tourDates,
        {
          name: bookTourDto.name,
          phone: bookTourDto.phone,
          email: bookTourDto.email,
        },
      ),
    ]);
  }

  async updateTour(
    id: string,
    updateTourDto: UpdateTourDto,
    supplierId: string,
  ) {
    const existingTour = await this.prismaService.tour.findUnique({
      where: { id, supplierId },
      select: {
        id: true,
        dates: { select: { startDate: true, endDate: true }, take: 1 },
        photos: true,
      },
    });
    const [existingTourDate] = existingTour?.dates ?? [];
    if (!existingTour || !existingTourDate) {
      throw new NotFoundException(`Tour not found by ID: ${id}`);
    }
    const {
      photoIds = [],
      recurrenceDates: rawRecurrenceDates = [],
      ...tourInfo
    } = updateTourDto;

    const existingPhotoIds = existingTour.photos.map((photo) => photo.id);
    const photoIdsToDelete = lodash.difference(existingPhotoIds, photoIds);
    const photoToDelete = existingTour.photos.filter((photo) =>
      photoIdsToDelete.includes(photo.id),
    );

    const recurrenceDates = rawRecurrenceDates.map((date) => new Date(date));
    const tourDates = this.generateTourDatesFromRecurrence(
      {
        startDate: existingTourDate.startDate,
        endDate: existingTourDate.endDate,
      },
      recurrenceDates,
    );

    const updatedTour = await this.prismaService.$transaction(async (tx) => {
      const photos = await tx.tourPhoto.findMany({
        select: { id: true },
        where: {
          id: { in: photoIds },
          supplierId,
          OR: [{ tourId: null }, { tourId: existingTour.id }],
        },
      });
      if (photos.length !== photoIds.length) {
        throw new BadRequestException('Wrong user photo input');
      }
      await Promise.all(
        photoIds.map((photoId, idx) =>
          tx.tourPhoto.update({
            where: { id: photoId },
            data: {
              order: idx + 1,
            },
          }),
        ),
      );

      if (photoToDelete.length > 0) {
        const photoUrlsToDelete = this.extractPhotoUrls(photoToDelete);
        await this.fileManagerService.deleteFilesByUrl(photoUrlsToDelete);
        await tx.tourPhoto.deleteMany({
          where: { id: { in: photoIdsToDelete } },
        });
      }

      return tx.tour.update({
        where: { id: existingTour.id },
        data: {
          photos: {
            connect: photoIds.map((photoId) => ({ id: photoId })),
          },
          dates: {
            createMany: { data: tourDates },
          },
          ...tourInfo,
        },
        include: { photos: true },
      });
    });

    return updatedTour;
  }

  getSupplierTourReservations(
    { limit, offset }: FindAllTourReservationsDto,
    supplierId: string,
  ) {
    return this.prismaService.tourReservation.findMany({
      where: { tourDate: { tour: { supplierId } } },
      select: {
        id: true,
        name: true,
        phoneNumber: true,
        email: true,
        tourDate: { select: { startDate: true, endDate: true, tourId: true } },
      },
      take: limit,
      skip: offset,
    });
  }

  async deleteTour(id: string, supplierId: string) {
    try {
      const tour = await this.prismaService.tour.findUniqueOrThrow({
        where: { id, supplierId },
        include: { photos: true },
      });
      const photoUrls = this.extractPhotoUrls(tour.photos);
      await this.fileManagerService.deleteFilesByUrl(photoUrls);

      return await this.prismaService.tour.delete({ where: { id } });
    } catch (e) {
      throw new NotFoundException(`Tour not found by ID: ${id}`);
    }
  }

  private extractPhotoUrls(
    photos: Prisma.TourPhotoCreateManyInput[],
  ): string[] {
    return photos.reduce((acc: string[], photo) => {
      acc.push(
        photo.originalStorageLink,
        photo.compressedMediumStorageLink,
        photo.compressedPreviewStorageLink,
      );
      return acc;
    }, []);
  }
}
