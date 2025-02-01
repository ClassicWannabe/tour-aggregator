import { ApiProperty } from '@nestjs/swagger';

export class TimestampDto {
  @ApiProperty({
    description: 'Creation date',
    example: '2024-10-01T12:34:56.789Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Update date',
    example: '2024-10-01T12:34:56.789Z',
  })
  updatedAt: Date;
}
