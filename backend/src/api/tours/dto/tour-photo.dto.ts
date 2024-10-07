import { ApiProperty } from '@nestjs/swagger';

export class TourPhotoDto {
  @ApiProperty({
    description: 'UUID of the tour photo',
    example: '1f4b806b-8483-4ee2-a013-d12dc959165e',
  })
  id: string;

  @ApiProperty({
    description: 'Original Tour photo link to the storage',
    example: 'https://example.com/tour-photo.jpg',
  })
  originalLink: string;

  @ApiProperty({
    description: 'Optimized (compressed) Tour photo link to the storage',
    example: 'https://example.com/tour-photo-compressed.jpg',
  })
  optimizedLink: string;

  @ApiProperty({
    description: 'Related tour ID',
    example: '1f4b806b-8483-4ee2-a013-d12dc959165e',
  })
  tourId: string;

  @ApiProperty({
    description: 'Created date',
    example: '2024-10-01T12:34:56.789Z',
  })
  createdAt: Date;
}
