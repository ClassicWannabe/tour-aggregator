import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { ToursModule } from './tours/tours.module';
import { SuppliersModule } from './suppliers/suppliers.module';
import { LocationModule } from './location/location.module';

@Module({
  imports: [
    ToursModule,
    SuppliersModule,
    LocationModule,
    RouterModule.register([
      {
        path: 'api',
        children: [ToursModule, SuppliersModule, LocationModule],
      },
    ]),
  ],
})
export class ApiModule {}
