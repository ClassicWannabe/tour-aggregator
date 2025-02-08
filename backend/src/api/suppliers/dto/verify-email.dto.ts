import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length, Matches } from 'class-validator';

export class VerifyEmailDto {
  @ApiProperty({
    description: 'Email Verification Code',
    example: '123456',
  })
  @IsString()
  @Length(6, 6)
  @Matches(/^\d{6}$/)
  code: string;

  @ApiProperty({
    description: 'Supplier Email',
    example: 'example@example.com',
  })
  @IsEmail()
  email: string;
}
