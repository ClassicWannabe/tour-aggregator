import { PartialType } from '@nestjs/swagger';
import { SignUpSupplierDto } from './sign-up-supplier.dto';

export class UpdateSupplierDto extends PartialType(SignUpSupplierDto) {}
