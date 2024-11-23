import { ApiProperty, PickType } from '@nestjs/swagger';
import { TourDto } from './tour.dto';
import { IsOptional, ValidateNested } from 'class-validator';
import { TourContactDto } from './tour-contact.dto';
import { Type } from 'class-transformer';
import { TourHighlightDto } from './tour-highlight.dto';
import { TourInclusionDto } from './tour-inclusion.dto';
import { TransformJsonToInstance } from '../../../decorators/transform-json-to-instance';
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
  'isActive',
]) {
  @ApiProperty({
    description: 'Tour contacts in JSON format',
    example: [{ phoneNumber: '7778883412' }],
    type: String,
  })
  @ValidateNested({ each: true })
  @TransformJsonToInstance(TourContactDto)
  contacts: TourContactDto[];

  @ApiProperty({
    description: 'Tour highlights in JSON format',
    example: [{ text: 'Lorem ipsum' }],
    type: String,
  })
  @ValidateNested({ each: true })
  @TransformJsonToInstance(TourHighlightDto)
  highlights: TourHighlightDto[];

  @ApiProperty({
    description: 'Tour inclusions in JSON format',
    example: [{ text: 'Lorem ipsum' }],
    type: String,
  })
  @ValidateNested({ each: true })
  @Type(() => TourInclusionDto)
  @TransformJsonToInstance(TourInclusionDto)
  inclusions: TourInclusionDto[];

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
