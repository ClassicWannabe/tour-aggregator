import { Module } from '@nestjs/common';
import { ToursService } from './tours.service';
import { ToursController } from './tours.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { NestjsFormDataModule } from 'nestjs-form-data';
import { FileManagerModule } from '../file-manager/file-manager.module';
import { RecurringTourService } from './recurring-tour.service';
import { LocationModule } from '../location/location.module';
import { IsLocationExistsModule } from 'src/decorators/is-location-exists/is-location-exists.module';
import { MailerModule } from 'src/mailer/mailer.module';

@Module({
  imports: [
    PrismaModule,
    NestjsFormDataModule,
    FileManagerModule,
    IsLocationExistsModule,
    LocationModule,
    MailerModule,
  ],
  controllers: [ToursController],
  providers: [ToursService, RecurringTourService],
})
export class ToursModule {}
