import { ApiProperty } from '@nestjs/swagger';
import { Length, ValidateNested } from 'class-validator';
import { TourProgramDto } from './tour-program.dto';
import { Type } from 'class-transformer';

export class TourProgramFormDto {
  @ApiProperty({
    description: 'Tour program events',
    type: [TourProgramDto],
  })
  @ValidateNested({ each: true })
  @Type(() => TourProgramDto)
  @Length(2, 30)
  program: TourProgramDto[];
}
