import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTourDto } from './dto/create-tour.dto';
import { UpdateTourDto } from './dto/update-tour.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { FindAllToursDto } from './dto/find-all-tours.dto';
import { MemoryStoredFile } from 'nestjs-form-data';
import { FileManagerService } from '../file-manager/file-manager.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class ToursService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly fileManagerService: FileManagerService,
  ) {}

  async create(createTourDto: CreateTourDto, supplierId: string) {
    const { photos = [], ...tourInfo } = createTourDto;
    const tourId = crypto.randomUUID();
    const uploadedPhotos = await this.uploadPhotos(photos, supplierId, tourId);

    const tour = await this.prismaService.tour.create({
      data: {
        id: tourId,
        supplierId: supplierId,
        photos: { createMany: { data: uploadedPhotos } },
        ...tourInfo,
      },
      include: { photos: true },
    });

    return tour;
  }

  private async uploadPhotos(
    photos: MemoryStoredFile[],
    supplierId: string,
    tourId: string,
  ): Promise<Prisma.TourPhotoCreateManyTourInput[]> {
    const uploadedPhotos = await Promise.all(
      photos.map((photo) =>
        this.fileManagerService.uploadPhoto({ photo, tourId, supplierId }),
      ),
    );

    return uploadedPhotos.map((photo) => ({
      originalStorageLink: photo.original.url,
      compressedMediumStorageLink: photo.medium.url,
      compressedPreviewStorageLink: photo.preview.url,
    }));
  }

  findAll(query: FindAllToursDto) {
    return this.prismaService.tour.findMany({
      include: {
        photos: query.shouldIncludePhotos,
      },
      take: query.limit,
      skip: query.offset,
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
