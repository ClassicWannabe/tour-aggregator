import { Module } from '@nestjs/common';
import { ToursService } from './tours.service';
import { ToursController } from './tours.controller';
import { PrismaModule } from '../../prisma/prisma.module';
import { NestjsFormDataModule } from 'nestjs-form-data';
import { FileManagerModule } from '../file-manager/file-manager.module';
import { IsLocationExistsModule } from '../../validators/is-location-exists/is-location-exists.module';
import { RecurringTourService } from './recurring-tour.service';
import { LocationModule } from '../location/location.module';

@Module({
  imports: [
    PrismaModule,
    NestjsFormDataModule,
    FileManagerModule,
    IsLocationExistsModule,
    LocationModule,
  ],
  controllers: [ToursController],
  providers: [ToursService, RecurringTourService],
})
export class ToursModule {}
