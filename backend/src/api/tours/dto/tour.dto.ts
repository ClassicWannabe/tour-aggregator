import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsInt,
  IsOptional,
  IsString,
  Length,
  Min,
  Max,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';

export class TourDto {
  @ApiProperty({
    description: 'UUID of a tour',
    example: '1f4b806b-8483-4ee2-a013-d12dc959165e',
  })
  id: string;

  @ApiProperty({ description: 'Title', example: 'My Tour Title' })
  @IsString()
  @Length(3, 80)
  title: string;

  @ApiProperty({ description: 'Thesis', example: 'My tour summary' })
  @IsString()
  @Length(3, 80)
  thesis: string;

  @ApiProperty({
    description: 'Tour description',
    example: 'Some tour description',
  })
  @IsString()
  @Length(3, 80)
  description: string;

  @ApiPropertyOptional({
    description: 'Transport description',
    example: 'Some transport description',
  })
  @IsString()
  @IsOptional()
  @Length(3, 80)
  transportDescription?: string;

  @ApiPropertyOptional({
    description: 'Responsible for whether the tour is visible for clients',
  })
  @IsBoolean()
  @IsOptional()
  @Transform(({ value }) =>
    typeof value === 'boolean' ? value : value === 'true',
  )
  isActive: boolean;

  @ApiProperty({
    description: 'Tour price per person',
    example: 10_000,
  })
  @IsInt()
  @Min(1000)
  @Max(10_000_000)
  @Type(() => Number)
  pricePerPerson: number;

  @ApiProperty({
    description: 'Created date',
    example: '2024-10-01T12:34:56.789Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Updated date',
    example: '2024-10-01T12:34:56.789Z',
  })
  updatedAt: Date;

  @ApiProperty({
    description: 'Supplier who created the tour',
    example: '1f4b806b-8483-4ee2-a013-d12dc959165e',
  })
  supplierId: string;
}
