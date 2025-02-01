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
import {
  SEARCH_SIMILARITY_MIN_THRESHOLD,
  TEMP_IMAGE_STORAGE_DAYS,
} from './constants';
import { DateTime } from 'luxon';

@Injectable()
export class ToursService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly fileManagerService: FileManagerService,
  ) {}

  async create(createTourDto: CreateTourDto, supplierId: string) {
    const { photoIds, recurrence, ...tourInfo } = createTourDto;

    const createdTour = await this.prismaService.$transaction(async (tx) => {
      const photos = await tx.tourPhoto.findMany({
        select: { id: true },
        where: {
          id: { in: photoIds },
          tourId: null,
        },
      });
      if (photos.length !== photoIds.length) {
        throw new BadRequestException('Wrong user input');
      }
      await Promise.all(
        photoIds.map((photoId, idx) =>
          tx.tourPhoto.update({
            where: { id: photoId },
            data: {
              deletedAt: null,
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
          recurrence: { create: recurrence },
          ...tourInfo,
        },
        include: { photos: true, recurrence: true },
      });
    });

    return createdTour;
  }

  async uploadPhoto(photo: MemoryStoredFile, supplierId: string) {
    const uploadedPhoto = await this.fileManagerService.uploadPhoto({
      photo,
      supplierId,
    });
    const deletedAt = DateTime.now()
      .plus({ days: TEMP_IMAGE_STORAGE_DAYS })
      .toJSDate();

    return this.prismaService.tourPhoto.create({
      omit: { deletedAt: true },
      data: {
        deletedAt,
        originalStorageLink: uploadedPhoto.original.url,
        compressedMediumStorageLink: uploadedPhoto.medium.url,
        compressedPreviewStorageLink: uploadedPhoto.preview.url,
      },
    });
  }

  async findAll(query: FindAllToursDto) {
    const whereClause = query.search
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

    const tours = await this.prismaService.tour.similarity({
      where: whereClause,
      take: query.limit,
      skip: query.offset,
    });
    const tourIds = tours.map((tour) => tour.id);
    const tourPhotos = await this.prismaService.tourPhoto.findMany({
      where: { tourId: { in: tourIds } },
    });

    return tours.map((tour) => {
      const relatedPhotos = tourPhotos.filter(
        (tourPhoto) => tourPhoto.tourId === tour.id,
      );

      return { ...tour, photos: relatedPhotos };
    });
  }

  async findOne(id: string) {
    try {
      return await this.prismaService.tour.findFirstOrThrow({
        include: {
          photos: true,
        },
        where: { id },
      });
    } catch (e) {
      throw new NotFoundException(`Tour not found by ID: ${id}`);
    }
  }

  update(id: number, updateTourDto: UpdateTourDto) {
    return `This action updates a #${id} tour`;
  }

  async remove(id: string, supplierId: string) {
    try {
      const tour = await this.prismaService.tour.findUniqueOrThrow({
        where: { id, supplierId },
        include: { photos: true },
      });
      const photoUrls = this.extractPhotoUrls(tour.photos);
      await this.fileManagerService.deletePhotos(photoUrls);

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
