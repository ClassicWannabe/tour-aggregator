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
        { time: '10:00', description: 'Meeting with team' },
        { time: '12:00', description: 'Lunch break' },
      ],
      [{ time: '02:00', description: 'Project update' }],
    ],
  })
  @ValidateNested({ each: true })
  @Type(() => TourProgramDto)
  @ArrayNotEmpty()
  @ArrayMinSize(2, { each: true })
  @ArrayMaxSize(20, { each: true })
  program: TourProgramDto[][];
}
