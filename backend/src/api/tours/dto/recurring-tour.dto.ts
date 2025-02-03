import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  ArrayUnique,
  IsDateString,
  IsEnum,
  ArrayMinSize,
} from 'class-validator';
import { Type } from 'class-transformer';
import { TourRepeatPattern, Weekday } from '../types';
import { DateTime } from 'luxon';
import { IsDateBetween } from '../../../validators/is-date-between/is-date-between';

export class RecurringTourDto {
  @ApiProperty({
    description: 'Weekdays: Monday-Sunday',
    example: [Weekday.SATURDAY, Weekday.SUNDAY],
  })
  @IsArray()
  @ArrayUnique()
  @ArrayMinSize(1)
  @IsEnum(Weekday, { each: true })
  weekdays: Weekday[];

  @ApiProperty({
    description: 'Thesis',
    enum: TourRepeatPattern,
  })
  @IsEnum(TourRepeatPattern)
  repeatPattern: TourRepeatPattern;

  @ApiProperty({
    description: 'Recurrence end date',
    example: '2024-10-02T12:34:56.789Z',
  })
  @Type(() => Date)
  @IsDateString()
  @IsDateBetween({
    min: () => DateTime.now(),
    max: () => DateTime.now().plus({ day: 90 }),
  })
  endDate: Date;
}
