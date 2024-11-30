import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, Max, Min, IsBoolean } from 'class-validator';
import { Type } from 'class-transformer';

export class FindAllToursDto {
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

  @ApiPropertyOptional({
    description: 'Include photos in the response',
    example: true,
  })
  @IsBoolean()
  @Type(() => Boolean)
  shouldIncludePhotos: boolean = false;
}
