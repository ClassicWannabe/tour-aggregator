import { Module } from '@nestjs/common';

import { PrismaService } from './prisma.service';

@Module({
  providers: [
    {
      useFactory: () =>
        new PrismaService({
          log: ['query', 'info', 'warn', 'error'],
          omit: { supplier: { password: true } },
        }),
      provide: PrismaService,
    },
  ],
  exports: [PrismaService],
})
export class PrismaModule {}
