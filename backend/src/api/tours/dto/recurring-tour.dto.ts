import { ApiProperty } from '@nestjs/swagger';
import { ArrayMaxSize, ArrayUnique, IsISO8601 } from 'class-validator';
import { DateTime } from 'luxon';
import { IsDateBetween } from 'src/decorators/is-date-between/is-date-between';

const MAX_RECURRENCE_DAY_OFFSET = 90;

export class RecurringTourDto {
  @ApiProperty({
    description: 'Recurrence dates',
    example: ['2024-10-02T12:34:56.789Z'],
  })
  @IsISO8601({ strict: true }, { each: true })
  @ArrayUnique()
  @ArrayMaxSize(90)
  @IsDateBetween(
    {
      min: () => DateTime.now(),
      max: () => DateTime.now().plus({ day: MAX_RECURRENCE_DAY_OFFSET }),
    },
    { each: true },
  )
  recurrenceDates: string[] = [];
}
