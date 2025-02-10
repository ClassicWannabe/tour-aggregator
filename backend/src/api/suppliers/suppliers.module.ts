import { Module } from '@nestjs/common';
import { SuppliersService } from './suppliers.service';
import { SuppliersController } from './suppliers.controller';
import { PrismaModule } from '../../prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { SUPPLIER_JWT_EXPIRES_IN, SUPPLIER_JWT_SECRET } from './constants';
import { MailerModule } from '../../mailer/mailer.module';
import { FileManagerModule } from '../file-manager/file-manager.module';
import { NestjsFormDataModule } from 'nestjs-form-data';

@Module({
  imports: [
    PrismaModule,
    JwtModule.register({
      global: true,
      secret: SUPPLIER_JWT_SECRET,
      signOptions: { expiresIn: SUPPLIER_JWT_EXPIRES_IN },
    }),
    MailerModule,
    FileManagerModule,
    NestjsFormDataModule,
  ],
  controllers: [SuppliersController],
  providers: [SuppliersService],
})
export class SuppliersModule {}
