import { PrismaService } from '../../prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class LocationService {
  constructor(private readonly prismaService: PrismaService) {}

  getLocations() {
    return this.prismaService.location.findMany({
      omit: { createdAt: true, updatedAt: true },
      orderBy: { name: 'asc' },
    });
  }
}
