import { Module } from '@nestjs/common';
import { SuppliersService } from './suppliers.service';
import { SuppliersController } from './suppliers.controller';
import { PrismaModule } from '../../prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { SUPPLIER_JWT_EXPIRES_IN, SUPPLIER_JWT_SECRET } from './constants';

@Module({
  imports: [
    PrismaModule,
    JwtModule.register({
      global: true,
      secret: SUPPLIER_JWT_SECRET,
      signOptions: { expiresIn: SUPPLIER_JWT_EXPIRES_IN },
    }),
  ],
  controllers: [SuppliersController],
  providers: [SuppliersService],
})
export class SuppliersModule {}
