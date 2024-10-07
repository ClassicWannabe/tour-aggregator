import { Module } from '@nestjs/common';
import { ToursService } from './tours.service';
import { ToursController } from './tours.controller';
import { PrismaModule } from '../../prisma/prisma.module';
import { NestjsFormDataModule } from 'nestjs-form-data';

@Module({
  imports: [PrismaModule, NestjsFormDataModule],
  controllers: [ToursController],
  providers: [ToursService],
})
export class ToursModule {}
