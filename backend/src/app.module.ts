import { Module } from '@nestjs/common';
import { ToursModule } from './api/tours/tours.module';

@Module({
  imports: [ToursModule],
})
export class AppModule {}
