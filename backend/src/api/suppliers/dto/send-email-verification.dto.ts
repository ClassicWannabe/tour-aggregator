import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class SendEmailVerificationDto {
  @ApiProperty({
    description: 'Supplier Email',
    example: 'example@example.com',
  })
  @IsEmail()
  email: string;
}
