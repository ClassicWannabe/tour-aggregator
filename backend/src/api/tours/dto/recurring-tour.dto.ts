import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsDate, IsArray, ArrayUnique, IsIn } from 'class-validator';
import { Type } from 'class-transformer';
import { Weekday, TourRepeatPattern } from '@prisma/client';
import { TimestampDto } from './timestamp.dto';

export class RecurringTourDto extends TimestampDto {
  @ApiProperty({
    description: 'UUID of tour recurrence',
    example: '1f4b806b-8483-4ee2-a013-d12dc959165e',
  })
  id: string;

  @ApiProperty({
    description: 'Weekdays: Monday-Sunday',
    example: [Weekday.SATURDAY, Weekday.SUNDAY],
  })
  @IsArray()
  @ArrayUnique()
  @IsIn(Object.values(Weekday), { each: true })
  weekdays: Weekday[];

  @ApiProperty({
    description: 'Thesis',
    example:
      'My tour summary: the best view in the whole world. Do not be late to get amazing experience in our tour',
  })
  @IsString()
  @IsIn(Object.values(TourRepeatPattern))
  repeatPattern: TourRepeatPattern;

  @ApiProperty({
    description: 'Recurrence end date',
    example: '2024-10-02T12:34:56.789Z',
  })
  @Type(() => Date)
  @IsDate()
  endDate: Date;

  @ApiProperty({
    description: 'Tour ID',
    example: '1f4b806b-8483-4ee2-a013-d12dc959165e',
  })
  tourId: string;
}
