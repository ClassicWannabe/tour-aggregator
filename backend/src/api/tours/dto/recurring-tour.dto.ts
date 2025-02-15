import { ApiProperty } from '@nestjs/swagger';
import { ArrayUnique, IsISO8601 } from 'class-validator';
import { DateTime } from 'luxon';
import { IsDateBetween } from '../../../validators/is-date-between/is-date-between';

const MAX_RECURRENCE_DAY_ADDITION = 90;

export class RecurringTourDto {
  @ApiProperty({
    description: 'Recurrence dates',
    example: ['2024-10-02T12:34:56.789Z'],
  })
  @IsISO8601({ strict: true }, { each: true })
  @ArrayUnique()
  @IsDateBetween(
    {
      min: () => DateTime.now(),
      max: () => DateTime.now().plus({ day: MAX_RECURRENCE_DAY_ADDITION }),
    },
    { each: true },
  )
  recurrenceDates: string[] = [];
}
