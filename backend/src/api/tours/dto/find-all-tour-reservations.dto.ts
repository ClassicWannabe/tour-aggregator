import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, Max, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class FindAllTourReservationsDto {
  @ApiPropertyOptional({
    description: 'Maximum number of tours to get',
    example: 10,
  })
  @IsInt()
  @Min(1)
  @Max(100)
  @Type(() => Number)
  limit: number = 20;

  @ApiPropertyOptional({
    description: 'Number to skip',
    example: 0,
  })
  @IsInt()
  @Min(0)
  @Type(() => Number)
  offset: number = 0;
}
