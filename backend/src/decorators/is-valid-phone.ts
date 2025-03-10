import { applyDecorators } from '@nestjs/common';
import { IsPhoneNumber, Matches } from 'class-validator';

export function IsValidPhone() {
  return applyDecorators(
    IsPhoneNumber('KZ'),
    Matches(/^\+77[0,7]\d{8}$/, {
      message:
        'Invalid phone number. Valid format: +770XXXXXXXX or +777XXXXXXXX',
    }),
  );
}
