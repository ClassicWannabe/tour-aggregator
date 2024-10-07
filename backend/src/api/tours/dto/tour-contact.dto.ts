import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length, IsPhoneNumber } from 'class-validator';

export class TourContactDto {
  @ApiProperty({
    description: 'UUID of the tour contact',
    example: '1f4b806b-8483-4ee2-a013-d12dc959165e',
  })
  id: string;

  @ApiProperty({
    description: 'Phone number of the supplier',
    example: '7778883412',
  })
  @IsString()
  @IsPhoneNumber('KZ')
  @Length(10, 10)
  phoneNumber: string;

  @ApiProperty({
    description: 'Related tour ID',
    example: '1f4b806b-8483-4ee2-a013-d12dc959165e',
  })
  tourId: string;

  @ApiProperty({
    description: 'Created date',
    example: '2024-10-01T12:34:56.789Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Updated date',
    example: '2024-10-01T12:34:56.789Z',
  })
  updatedAt: Date;
}
