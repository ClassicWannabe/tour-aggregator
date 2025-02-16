import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length, IsISO8601 } from 'class-validator';

export class TourProgramDto {
  @ApiProperty({
    description: 'Event time',
    example: '11:00',
  })
  @IsISO8601({ strict: true })
  time: string;

  @ApiProperty({
    description: 'Event description',
    example: 'Walking till the mountain near the lake',
  })
  @IsString()
  @Length(20, 200)
  description: string;
}
