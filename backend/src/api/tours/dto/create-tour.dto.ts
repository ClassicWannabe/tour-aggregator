import { PickType, IntersectionType } from '@nestjs/swagger';
import { TourDto } from './tour.dto';
import { RecurringTourDto } from './recurring-tour.dto';
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
    'peopleCount',
    'inclusions',
    'exclusions',
    'startDate',
    'endDate',
    'type',
  ]),
  PickType(TourPhotoFormDto, ['photoIds']),
  PickType(TourProgramFormDto, ['program']),
  PickType(RecurringTourDto, ['recurrenceDates']),
) {}
