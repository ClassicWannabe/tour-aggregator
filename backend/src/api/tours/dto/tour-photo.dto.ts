import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { TimestampDto } from './timestamp.dto';

export class TourPhotoDto extends TimestampDto {
  @ApiProperty({
    description: 'UUID of the tour photo',
    example: '1f4b806b-8483-4ee2-a013-d12dc959165e',
  })
  id: string;

  @ApiProperty({
    description: 'Original Tour photo link to the storage',
    example: 'https://example.com/tour-photo.jpg',
  })
  originalStorageLink: string;

  @ApiProperty({
    description: 'Optimized (compressed) Tour medium photo link to the storage',
    example: 'https://example.com/tour-photo-compressed-medium.jpg',
  })
  compressedMediumStorageLink: string;

  @ApiProperty({
    description:
      'Optimized (compressed) Tour preview photo link to the storage',
    example: 'https://example.com/tour-photo-compressed-preview.jpg',
  })
  compressedPreviewStorageLink: string;

  @ApiPropertyOptional({
    description: 'Photo order',
    example: 1,
  })
  order?: number;

  @ApiPropertyOptional({
    description: 'Deletion date',
    example: '2024-10-01T12:34:56.789Z',
  })
  deletedAt?: Date;

  @ApiPropertyOptional({
    description: 'Related tour ID',
    example: '1f4b806b-8483-4ee2-a013-d12dc959165e',
  })
  tourId?: string;
}
