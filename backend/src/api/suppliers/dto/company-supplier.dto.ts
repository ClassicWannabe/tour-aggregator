import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

export class CompanySupplierDto {
  @ApiProperty({
    description: 'Company name',
    example: 'ТОО "Компания"',
  })
  @IsString()
  @Length(3, 30)
  companyName: string;

  @ApiProperty({
    description: 'Owner full name',
    example: 'Димаш Кудайберген',
  })
  @IsString()
  @Length(2, 20)
  ownerName: string;
}
