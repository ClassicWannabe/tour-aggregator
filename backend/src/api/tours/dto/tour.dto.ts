import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsInt,
  IsString,
  Length,
  Min,
  Max,
  ArrayMinSize,
  ArrayMaxSize,
  IsDate,
  IsBoolean,
  IsUUID,
  Validate,
  IsIn,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { IsLocationExistsValidator } from '../../../validators/is-location-exists/is-location-exists.validator';
import { TimestampDto } from './timestamp.dto';
import { TourType } from '@prisma/client';

export class TourDto extends TimestampDto {
  @ApiProperty({
    description: 'UUID of a tour',
    example: '1f4b806b-8483-4ee2-a013-d12dc959165e',
  })
  id: string;

  @ApiProperty({
    description: 'Title',
    example: 'My Tour Title that is going to attract many people',
  })
  @IsString()
  @Length(10, 100)
  title: string;

  @ApiProperty({
    description: 'Thesis',
    example:
      'My tour summary: the best view in the whole world. Do not be late to get amazing experience in our tour',
  })
  @IsString()
  @Length(50, 200)
  thesis: string;

  @ApiProperty({
    description: 'Tour description',
    example: 'Some tour description',
  })
  @IsString()
  @Length(50, 3000)
  description: string;

  @ApiProperty({
    description: 'Tour type',
    enum: TourType,
  })
  @IsIn(Object.values(TourType))
  type: TourType;

  @ApiProperty({
    description: 'Is transport included?',
    example: true,
  })
  @IsBoolean()
  isTransportIncluded: boolean;

  @ApiProperty({
    description: 'Tour inclusion text',
    example: ['Food'],
  })
  @ArrayMinSize(1)
  @ArrayMaxSize(10)
  @IsString({ each: true })
  @Length(3, 80, { each: true })
  inclusions: string[];

  @ApiProperty({
    description: 'Tour exclusion text',
    example: ['Clothing'],
  })
  @ArrayMinSize(1)
  @ArrayMaxSize(10)
  @IsString({ each: true })
  @Length(3, 80, { each: true })
  exclusions: string[];

  @ApiPropertyOptional({
    description: 'Tour price per person in tenge',
    example: 10_000,
  })
  @Transform(({ value }) => (value === null ? 0 : value))
  @IsInt()
  @Min(0)
  @Max(10_000_000)
  @Type(() => Number)
  pricePerPerson: number;

  @ApiProperty({
    description: 'Tour location UUID',
    example: '1f4b806b-8483-4ee2-a013-d12dc959165e',
  })
  @IsUUID()
  @Validate(IsLocationExistsValidator)
  locationId: string;

  @ApiProperty({
    description: 'Max number of people during tour',
    example: 20,
  })
  @IsInt()
  @Min(1)
  @Max(100)
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
    description: 'Supplier UUID who created the tour',
    example: '1f4b806b-8483-4ee2-a013-d12dc959165e',
  })
  supplierId: string;
}
