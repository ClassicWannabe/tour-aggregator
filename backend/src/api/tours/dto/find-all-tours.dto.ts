import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, Max, Min, IsString, IsOptional } from 'class-validator';
import { Type, Transform } from 'class-transformer';
import { SanitizeString } from '../../../decorators/sanitize-string';

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
    description: 'Search tours',
    example: 'Camping',
  })
  @IsOptional()
  @IsString()
  @SanitizeString()
  search: string;
}
