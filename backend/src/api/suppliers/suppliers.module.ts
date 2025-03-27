import { Module } from '@nestjs/common';
import { SuppliersService } from './suppliers.service';
import { SuppliersController } from './suppliers.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { MailerModule } from 'src/mailer/mailer.module';
import { FileManagerModule } from '../file-manager/file-manager.module';
import { NestjsFormDataModule } from 'nestjs-form-data';

@Module({
  imports: [
    PrismaModule,
    MailerModule,
    FileManagerModule,
    NestjsFormDataModule,
  ],
  controllers: [SuppliersController],
  providers: [SuppliersService],
})
export class SuppliersModule {}
