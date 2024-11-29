import { ApiProperty, PickType } from '@nestjs/swagger';
import { TourDto } from './tour.dto';
import { IsOptional } from 'class-validator';
import {
  HasMimeType,
  IsFiles,
  MemoryStoredFile,
  MaxFileSize,
} from 'nestjs-form-data';
import { TWO_MB_IN_BYTES } from '../constants';

export class CreateTourDto extends PickType(TourDto, [
  'title',
  'thesis',
  'description',
  'transportDescription',
  'pricePerPerson',
  'contacts',
  'peopleCount',
  'inclusions',
  'exclusions',
  'highlights',
  'startDate',
  'endDate',
]) {
  @ApiProperty({
    description: 'Tour photos',
    type: [String],
    format: 'binary',
  })
  @IsFiles()
  @HasMimeType(['image/jpeg', 'image/png'], { each: true })
  @MaxFileSize(TWO_MB_IN_BYTES, { each: true })
  @IsOptional()
  photos: MemoryStoredFile[];
}
