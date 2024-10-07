import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { ToursModule } from './tours/tours.module';
import { SuppliersModule } from './suppliers/suppliers.module';

@Module({
  imports: [
    ToursModule,
    SuppliersModule,
    RouterModule.register([
      {
        path: 'api',
        children: [ToursModule, SuppliersModule],
      },
    ]),
  ],
})
export class ApiModule {}
