import { ApiProperty } from '@nestjs/swagger';
import { ValidateNested, ArrayMinSize, ArrayMaxSize } from 'class-validator';
import { TourProgramDto } from './tour-program.dto';
import { Type } from 'class-transformer';

export class TourProgramFormDto {
  @ApiProperty({
    description: 'Tour program events',
    type: [TourProgramDto],
  })
  @ValidateNested({ each: true })
  @Type(() => TourProgramDto)
  @ArrayMinSize(2)
  @ArrayMaxSize(20)
  program: TourProgramDto[];
}
