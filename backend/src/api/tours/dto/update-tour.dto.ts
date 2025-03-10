import { CreateTourDto } from './create-tour.dto';
import { PartialType, OmitType } from '@nestjs/swagger';

export class UpdateTourDto extends OmitType(PartialType(CreateTourDto), [
  'startDate',
  'endDate',
]) {}
