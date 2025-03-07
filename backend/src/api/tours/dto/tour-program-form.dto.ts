import { ApiProperty } from '@nestjs/swagger';
import {
  ValidateNested,
  ArrayMinSize,
  ArrayMaxSize,
  ArrayNotEmpty,
} from 'class-validator';
import { TourProgramDto } from './tour-program.dto';
import { Type } from 'class-transformer';

export class TourProgramFormDto {
  @ApiProperty({
    description: 'Tour program events',
    type: [[TourProgramDto]],
    example: [
      [
        { time: '2025-01-01T10:00:00.000Z', description: 'Meeting with team' },
        { time: '2025-01-01T12:00:00.000Z', description: 'Lunch break' },
      ],
      [{ time: '2025-01-02T02:00:00.000Z', description: 'Project update' }],
    ],
  })
  @ValidateNested({ each: true })
  @Type(() => TourProgramDto)
  @ArrayNotEmpty()
  @ArrayMinSize(2, { each: true })
  @ArrayMaxSize(20, { each: true })
  program: TourProgramDto[][];
}
