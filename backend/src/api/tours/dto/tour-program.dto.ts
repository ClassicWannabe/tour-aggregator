import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsString,
  Min,
  Max,
  Matches,
  IsOptional,
} from 'class-validator';

export class TourProgramDto {
  @ApiProperty({
    description: 'For multi-day tours',
    example: 1,
  })
  @IsInt()
  @Min(1)
  @Max(100)
  @IsOptional()
  day?: number;

  @ApiProperty({
    description: 'Event time',
    example: '11:00',
  })
  @IsString()
  @Matches(/^(?:[01]\d|2[0-3]):[0-5]\d$/)
  time: string;

  @ApiProperty({
    description: 'Event description',
    example: 'Walking till the mountain near the lake',
  })
  @IsString()
  @Min(20)
  @Max(200)
  description: string;
}
