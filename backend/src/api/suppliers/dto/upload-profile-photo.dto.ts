import { ApiProperty } from '@nestjs/swagger';
import {
  HasMimeType,
  IsFile,
  MaxFileSize,
  MemoryStoredFile,
} from 'nestjs-form-data';
import { ALLOWED_PHOTO_MIME_TYPES, FIVE_MB_IN_BYTES } from '../constants';

export class UploadProfilePhotoDto {
  @ApiProperty({
    description: 'Profile photo',
    type: String,
    format: 'binary',
  })
  @IsFile()
  @HasMimeType(ALLOWED_PHOTO_MIME_TYPES)
  @MaxFileSize(FIVE_MB_IN_BYTES)
  photo: MemoryStoredFile;
}
