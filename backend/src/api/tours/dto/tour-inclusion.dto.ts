import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

export class TourInclusionDto {
  @ApiProperty({
    description: 'UUID of the tour inclusion',
    example: '1f4b806b-8483-4ee2-a013-d12dc959165e',
  })
  id: string;

  @ApiProperty({
    description: 'Tour highlight text',
    example: 'Best view in the city',
  })
  @IsString()
  @Length(3, 80)
  text: string;

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

  @ApiProperty({
    description: 'Updated date',
    example: '2024-10-01T12:34:56.789Z',
  })
  updatedAt: Date;
}
