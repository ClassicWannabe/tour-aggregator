import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTourDto } from './dto/create-tour.dto';
import { UpdateTourDto } from './dto/update-tour.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { FindAllToursDto } from './dto/find-all-tours.dto';
import { MemoryStoredFile } from 'nestjs-form-data';
import { FileManagerService } from '../file-manager/file-manager.service';
import { Prisma } from '@prisma/client';
import { SEARCH_SIMILARITY_MIN_THRESHOLD } from './constants';
import { RecurringTourService } from './recurring-tour.service';

@Injectable()
export class ToursService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly fileManagerService: FileManagerService,
    private readonly recurringTourService: RecurringTourService,
  ) {}

  async createTour(createTourDto: CreateTourDto, supplierId: string) {
    const { photoIds, recurrenceDates, startDate, endDate, ...tourInfo } =
      createTourDto;

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
  ): Prisma.TourDateCreateManyTourInput[] {
    return this.recurringTourService.generateRecurringDates(
      initialDates.startDate,
      initialDates.endDate,
      recurrenceDates,
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
      take: query.limit,
      skip: query.offset,
    });
    const tourIds = tours.map((tour) => tour.id);
    const tourPhotos = tourIds.length
      ? await this.prismaService.tourPhoto.findMany({
          where: { tourId: { in: tourIds } },
        })
      : [];

    return tours.map((tour) => {
      const relatedPhotos = tourPhotos.filter(
        (tourPhoto) => tourPhoto.tourId === tour.id,
      );

      return { ...tour, photos: relatedPhotos };
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

    const whereRaw: string[] = [];
    if (query.locationId) {
      whereRaw.push(`"locationId" = '${query.locationId}'`);
    }
    if (query.minPricePerPerson) {
      whereRaw.push(`"pricePerPerson" >= ${query.minPricePerPerson}`);
    }
    if (query.maxPricePerPerson) {
      whereRaw.push(`"pricePerPerson" <= ${query.maxPricePerPerson}`);
    }
    if (query.type) {
      whereRaw.push(`"type" <= '${query.type}'`);
    }

    return { whereRaw, whereSimilarity };
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

  updateTour(id: number, updateTourDto: UpdateTourDto) {
    return `This action updates a #${id} tour`;
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
