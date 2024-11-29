import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

export class IndividualSupplierDto {
  @ApiProperty({
    description: 'First Name',
    example: 'Димаш',
  })
  @IsString()
  @Length(2, 20)
  firstName: string;

  @ApiProperty({
    description: 'Last Name',
    example: 'Кудайберген',
  })
  @IsString()
  @Length(2, 20)
  lastName: string;
}
