import { ApiProperty } from '@nestjs/swagger';
import { ArrayMaxSize, ArrayMinSize, IsUUID } from 'class-validator';

export class TourPhotoFormDto {
  @ApiProperty({
    description: 'UUIDs of the tour photo',
    example: ['1f4b806b-8483-4ee2-a013-d12dc959165e'],
  })
  @IsUUID(undefined, { each: true })
  @ArrayMinSize(2)
  @ArrayMaxSize(20)
  photoIds: string[];
}
