import { PickType } from '@nestjs/swagger';
import { SupplierDto } from './supplier.dto';

export class SignInSupplierDto extends PickType(SupplierDto, [
  'email',
  'password',
]) {}
