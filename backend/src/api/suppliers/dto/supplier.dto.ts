import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { SupplierType } from '@prisma/client';
import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  IsStrongPassword,
  Length,
} from 'class-validator';

export class SupplierDto {
  @ApiProperty({
    description: 'UUID of a supplier',
    example: '1f4b806b-8483-4ee2-a013-d12dc959165e',
  })
  id: string;

  @ApiProperty({
    description: 'Supplier type',
    enum: SupplierType,
  })
  @IsEnum(SupplierType)
  type: SupplierType;

  @ApiPropertyOptional({
    description: 'Company name',
    example: 'ТОО "Компания"',
  })
  @IsOptional()
  @IsString()
  @Length(3, 30)
  companyName?: string;

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

  @ApiProperty({
    description: 'Supplier Email',
    example: 'example@example.com',
    uniqueItems: true,
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Is Email verified',
    example: false,
  })
  isEmailVerified: boolean;

  @ApiProperty({
    description: 'Supplier password',
    example: '$$$1MySuperVeryStrongPassword1$$$',
  })
  @IsStrongPassword()
  password: string;
}
