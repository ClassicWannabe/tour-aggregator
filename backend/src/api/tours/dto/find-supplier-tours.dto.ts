import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, Max, Min, IsOptional, IsEnum } from 'class-validator';
import { Type } from 'class-transformer';

export enum TourStatus {
  ACTIVE = 'ACTIVE',
  FINISHED = 'FINISHED',
}

export class FindSupplierToursDto {
  @ApiPropertyOptional({
    description: 'Maximum number of tours to get',
    example: 10,
  })
  @IsInt()
  @Min(1)
  @Max(100)
  @Type(() => Number)
  limit: number = 20;

  @ApiPropertyOptional({
    description: 'Number to skip',
    example: 0,
  })
  @IsInt()
  @Min(0)
  @Type(() => Number)
  offset: number = 0;

  @ApiPropertyOptional({
    description: 'Tour completion type',
    enum: TourStatus,
  })
  @IsOptional()
  @IsEnum(TourStatus)
  status?: TourStatus;
}
