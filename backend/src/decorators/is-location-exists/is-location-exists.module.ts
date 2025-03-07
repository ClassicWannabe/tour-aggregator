import { Module } from '@nestjs/common';
import { IsLocationExistsValidator } from './is-location-exists.validator';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [IsLocationExistsValidator],
  exports: [IsLocationExistsValidator],
})
export class IsLocationExistsModule {}
