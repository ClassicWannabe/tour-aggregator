import { ApiProperty } from '@nestjs/swagger';
import { IsValidPhone } from 'src/decorators/is-valid-phone';
import { IsEmail, IsString, IsUUID, Length } from 'class-validator';

export class BookTourDto {
  @ApiProperty({
    description: 'Tour date ID',
    example: '1f4b806b-8483-4ee2-a013-d12dc959165e',
  })
  @IsUUID()
  dateId: string;

  @ApiProperty({
    description: 'Client full name',
    example: 'Димаш Кудайберген',
  })
  @IsString()
  @Length(2, 20)
  name: string;

  @ApiProperty({
    description: 'Client phone number',
    example: '+77000000000',
  })
  @IsValidPhone()
  phone: string;

  @ApiProperty({
    description: 'Client email',
    example: 'example@example.com',
  })
  @IsEmail()
  email: string;
}
