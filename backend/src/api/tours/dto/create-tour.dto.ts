import {
  ApiProperty,
  ApiPropertyOptional,
  PickType,
  IntersectionType,
} from '@nestjs/swagger';
import { TourDto } from './tour.dto';
import { IsOptional, Length, ValidateNested } from 'class-validator';
import { RecurringTourDto } from './recurring-tour.dto';
import { Type } from 'class-transformer';
import { TourProgramDto } from './tour-program.dto';
import { TourPhotoFormDto } from './tour-photo-form.dto';
import { TourProgramFormDto } from './tour-program-form.dto';

export class CreateTourDto extends IntersectionType(
  PickType(TourDto, [
    'title',
    'thesis',
    'description',
    'isTransportIncluded',
    'locationId',
    'pricePerPerson',
    'contacts',
    'peopleCount',
    'inclusions',
    'exclusions',
    'startDate',
    'endDate',
    'type',
  ]),
  PickType(TourPhotoFormDto, ['photoIds']),
  PickType(TourProgramFormDto, ['program']),
) {
  @ApiPropertyOptional({
    description: 'Tour recurrence pattern',
  })
  @ValidateNested()
  @Type(() => RecurringTourDto)
  @IsOptional()
  recurrence?: RecurringTourDto;
}
