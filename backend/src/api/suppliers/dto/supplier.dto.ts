import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { SupplierType } from '@prisma/client';
import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  IsStrongPassword,
  Length,
  ArrayMaxSize,
  IsUrl,
} from 'class-validator';
import { IsValidPhone } from 'src/decorators/is-valid-phone';

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
    description: 'Personal description',
    example: 'Опытный походник с 5-летним опытом',
  })
  @IsOptional()
  @IsString()
  @Length(3, 100)
  aboutMe?: string;

  @ApiProperty({
    description: 'Supplier Email',
    example: 'example@example.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Supplier Phone Number',
    example: '+77000000000',
  })
  @IsValidPhone()
  phone: string;

  @ApiPropertyOptional({
    description: 'Social Links',
    example: ['https://www.instagram.com/'],
  })
  @ArrayMaxSize(5)
  @IsOptional()
  @IsUrl(undefined, { each: true })
  socialLinks?: string[];

  @ApiProperty({
    description: 'Supplier password',
    example: '$$$1MySuperVeryStrongPassword1$$$',
  })
  @IsStrongPassword()
  password: string;
}
