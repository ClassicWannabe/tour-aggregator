import { ApiProperty } from '@nestjs/swagger';
import {
  HasMimeType,
  IsFile,
  MaxFileSize,
  MemoryStoredFile,
} from 'nestjs-form-data';
import { ALLOWED_CERTIFICATE_MIME_TYPES, ONE_MB_IN_BYTES } from '../constants';

export class UploadCertificateDto {
  @ApiProperty({
    description: 'Supplier certificate',
    type: String,
    format: 'binary',
  })
  @IsFile()
  @HasMimeType(ALLOWED_CERTIFICATE_MIME_TYPES)
  @MaxFileSize(ONE_MB_IN_BYTES)
  certificate: MemoryStoredFile;
}
