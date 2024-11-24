import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';

export class VerifyEmailDto {
  @ApiProperty({
    description: 'Email Verification Code',
    example: '123456',
  })
  @IsString()
  @Length(6, 6)
  code: string;

  @ApiProperty({
    description: 'Supplier Email',
    example: 'example@example.com',
  })
  @IsEmail()
  email: string;
}
