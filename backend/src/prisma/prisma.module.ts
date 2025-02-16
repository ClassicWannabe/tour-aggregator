import { Module } from '@nestjs/common';

import { PrismaService } from './prisma.service';

const omitTimestamps = { createdAt: true, updatedAt: true };

@Module({
  providers: [
    {
      useFactory: () =>
        new PrismaService({
          log: ['query', 'info', 'warn', 'error'],
          omit: {
            supplier: { password: true, ...omitTimestamps },
            tour: omitTimestamps,
            tourPhoto: omitTimestamps,
            location: omitTimestamps,
          },
        }),
      provide: PrismaService,
    },
  ],
  exports: [PrismaService],
})
export class PrismaModule {}
