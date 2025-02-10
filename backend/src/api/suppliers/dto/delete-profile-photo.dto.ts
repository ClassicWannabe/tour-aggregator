import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class DeleteProfilePhotoDto {
  @ApiProperty({
    description: 'Supplier profile photo UUID',
  })
  @IsUUID()
  photoId: string;
}
