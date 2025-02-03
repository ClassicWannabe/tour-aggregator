import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class DeletePhotoDto {
  @ApiPropertyOptional({
    description: 'Tour photo UUID',
  })
  @IsUUID()
  photoId: string;
}
