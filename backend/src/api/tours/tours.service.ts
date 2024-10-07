import { Injectable } from '@nestjs/common';
import { CreateTourDto } from './dto/create-tour.dto';
import { UpdateTourDto } from './dto/update-tour.dto';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class ToursService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createTourDto: CreateTourDto) {
    const {
      contacts = [],
      highlights = [],
      inclusions = [],
      photos = [],
      ...tourInfo
    } = createTourDto;
    return this.prismaService.tour.create({
      data: {
        supplierId: '1f4b806b-8483-4ee2-a013-d12dc959165e',
        contacts: { createMany: { data: contacts } },
        highlights: { createMany: { data: highlights } },
        inclusions: { createMany: { data: inclusions } },
        ...tourInfo,
      },
      include: { contacts: true, highlights: true, inclusions: true },
    });
  }

  findAll() {
    return `This action returns all tours`;
  }

  findOne(id: number) {
    return `This action returns a #${id} tour`;
  }

  update(id: number, updateTourDto: UpdateTourDto) {
    return `This action updates a #${id} tour`;
  }

  remove(id: number) {
    return `This action removes a #${id} tour`;
  }
}
