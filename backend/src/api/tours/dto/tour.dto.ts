import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsInt,
  IsOptional,
  IsString,
  Length,
  Min,
  Max,
  IsPhoneNumber,
  ArrayMaxSize,
  IsDate,
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
  @Length(3, 200)
  thesis: string;

  @ApiProperty({
    description: 'Tour description',
    example: 'Some tour description',
  })
  @IsString()
  @Length(3, 1000)
  description: string;

  @ApiPropertyOptional({
    description: 'Transport description',
    example: 'Some transport description',
  })
  @IsString()
  @IsOptional()
  @Length(3, 100)
  transportDescription?: string;

  @ApiProperty({
    description: 'Phone number of the supplier',
    example: ['7778883412', '7778883412'],
  })
  @ArrayMaxSize(10)
  @IsString({ each: true })
  @IsPhoneNumber('KZ', { each: true })
  @Length(10, 10, { each: true })
  @Transform(({ value }) => {
    return value.split(',');
  })
  contacts: string[];

  @ApiProperty({
    description: 'Tour highlight text',
    example: ['Best view in the city', 'Super experience and many more'],
  })
  @ArrayMaxSize(10)
  @IsString({ each: true })
  @Length(3, 80, { each: true })
  @Transform(({ value }) => {
    return value.split(',');
  })
  highlights: string[];

  @ApiProperty({
    description: 'Tour inclusion text',
    example: ['Food'],
  })
  @ArrayMaxSize(10)
  @IsString({ each: true })
  @Length(3, 80, { each: true })
  @Transform(({ value }) => {
    return value.split(',');
  })
  inclusions: string[];

  @ApiProperty({
    description: 'Tour exclusion text',
    example: ['Clothing'],
  })
  @ArrayMaxSize(10)
  @IsString({ each: true })
  @Length(3, 80, { each: true })
  @Transform(({ value }) => {
    return value.split(',');
  })
  exclusions: string[];

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
    description: 'Max number of people during tour',
    example: 20,
  })
  @IsInt()
  @Min(1)
  @Max(1000)
  @Type(() => Number)
  peopleCount: number;

  @ApiProperty({
    description: 'Tour start date',
    example: '2024-10-01T12:34:56.789Z',
  })
  @Type(() => Date)
  @IsDate()
  startDate: Date;

  @ApiProperty({
    description: 'Tour end date',
    example: '2024-10-02T12:34:56.789Z',
  })
  @Type(() => Date)
  @IsDate()
  endDate: Date;

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
