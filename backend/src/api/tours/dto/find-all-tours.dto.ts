import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsInt,
  Max,
  Min,
  IsString,
  IsOptional,
  IsEnum,
  IsUUID,
} from 'class-validator';
import { Type } from 'class-transformer';
import { SanitizeString } from 'src/decorators/sanitize-string';
import { TourType } from '@prisma/client';

export class FindAllToursDto {
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
    description: 'Search tours',
    example: 'Camping',
  })
  @IsOptional()
  @IsString()
  @SanitizeString()
  search?: string;

  @ApiPropertyOptional({
    description: 'Tour type',
    enum: TourType,
    isArray: true,
  })
  @IsOptional()
  @IsEnum(TourType, { each: true })
  type?: TourType[];

  @ApiPropertyOptional({
    description: 'Tour min price per person',
    example: 1000,
  })
  @IsOptional()
  @IsInt()
  @Min(1000)
  @Max(10_000_000)
  @Type(() => Number)
  minPricePerPerson?: number;

  @ApiPropertyOptional({
    description: 'Tour max price per person',
    example: 10_000_000,
  })
  @IsOptional()
  @IsInt()
  @Min(1000)
  @Max(10_000_000)
  @Type(() => Number)
  maxPricePerPerson?: number;

  @ApiPropertyOptional({
    description: 'Location ID',
    example: '1f4b806b-8483-4ee2-a013-d12dc959165e',
  })
  @IsOptional()
  @IsUUID()
  locationId?: string;
}
