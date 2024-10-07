import { Module } from '@nestjs/common';

import { PrismaService } from './prisma.service';

@Module({
  providers: [
    {
      useFactory: () =>
        new PrismaService({ log: ['query', 'info', 'warn', 'error'] }),
      provide: PrismaService,
    },
  ],
  exports: [PrismaService],
})
export class PrismaModule {}
