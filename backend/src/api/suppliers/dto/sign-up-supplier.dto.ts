import { PickType } from '@nestjs/swagger';
import { SupplierDto } from './supplier.dto';

export class SignUpSupplierDto extends PickType(SupplierDto, [
  'type',
  'email',
  'firstName',
  'lastName',
  'companyName',
  'password',
]) {}
