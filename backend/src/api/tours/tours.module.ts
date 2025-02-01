import { Module } from '@nestjs/common';
import { ToursService } from './tours.service';
import { ToursController } from './tours.controller';
import { PrismaModule } from '../../prisma/prisma.module';
import { NestjsFormDataModule } from 'nestjs-form-data';
import { FileManagerModule } from '../file-manager/file-manager.module';
import { IsLocationExistsModule } from '../../validators/is-location-exists/is-location-exists.module';

@Module({
  imports: [
    PrismaModule,
    NestjsFormDataModule,
    FileManagerModule,
    IsLocationExistsModule,
  ],
  controllers: [ToursController],
  providers: [ToursService],
})
export class ToursModule {}
