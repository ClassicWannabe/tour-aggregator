import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, ArrayMinSize, ArrayMaxSize } from 'class-validator';

export class DeleteCertificatesDto {
  @ApiProperty({
    description: 'Supplier certificate UUID',
  })
  @IsUUID(undefined, { each: true })
  @ArrayMinSize(1)
  @ArrayMaxSize(100)
  certificateIds: string[];
}
