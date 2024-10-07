import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTourDto } from './dto/create-tour.dto';
import { UpdateTourDto } from './dto/update-tour.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { FindAllToursDto } from './dto/find-all-tours.dto';

@Injectable()
export class ToursService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createTourDto: CreateTourDto) {
    console.log(createTourDto);
    const {
      contacts = [],
      highlights = [],
      inclusions = [],
      photos = [],
      ...tourInfo
    } = createTourDto;
    return this.prismaService.tour.create({
      data: {
        supplierId: tourInfo.supplierId,
        contacts: { createMany: { data: contacts } },
        highlights: { createMany: { data: highlights } },
        inclusions: { createMany: { data: inclusions } },
        ...tourInfo,
      },
      include: { contacts: true, highlights: true, inclusions: true },
    });
  }

  findAll(query: FindAllToursDto) {
    return this.prismaService.tour.findMany({
      include: {
        photos: query.shouldIncludePhotos,
        contacts: query.shouldIncludeContacts,
        highlights: query.shouldIncludeHighlights,
        inclusions: query.shouldIncludeInclusions,
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
          contacts: true,
          highlights: true,
          inclusions: true,
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

  async remove(id: string) {
    try {
      return await this.prismaService.tour.delete({ where: { id } });
    } catch (e) {
      throw new NotFoundException(`Tour not found by ID: ${id}`);
    }
  }
}
