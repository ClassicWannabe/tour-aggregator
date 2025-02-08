import { ApiProperty } from '@nestjs/swagger';
import { ArrayUnique, IsDateString } from 'class-validator';
import { Type } from 'class-transformer';
import { DateTime } from 'luxon';
import { IsDateBetween } from '../../../validators/is-date-between/is-date-between';

const MAX_RECURRENCE_DAY_ADDITION = 90;

export class RecurringTourDto {
  @ApiProperty({
    description: 'Recurrence dates',
    example: ['2024-10-02T12:34:56.789Z'],
  })
  @Type(() => Date)
  @IsDateString(undefined, { each: true })
  @ArrayUnique()
  @IsDateBetween(
    {
      min: () => DateTime.now(),
      max: () => DateTime.now().plus({ day: MAX_RECURRENCE_DAY_ADDITION }),
    },
    { each: true },
  )
  recurrenceDates: Date[] = [];
}
