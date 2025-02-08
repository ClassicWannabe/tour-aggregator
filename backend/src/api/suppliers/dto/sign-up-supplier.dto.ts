import { ApiPropertyOptional, PickType } from '@nestjs/swagger';
import { SupplierDto } from './supplier.dto';
import { CompanySupplierDto } from './company-supplier.dto';
import { IndividualSupplierDto } from './individual-supplier.dto';
import { ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class SignUpSupplierDto extends PickType(SupplierDto, [
  'email',
  'phone',
  'aboutMe',
  'socialLinks',
  'password',
]) {
  @ApiPropertyOptional({ type: CompanySupplierDto })
  @ValidateNested()
  @Type(() => CompanySupplierDto)
  companySupplier?: CompanySupplierDto;

  @ApiPropertyOptional({ type: IndividualSupplierDto })
  @ValidateNested()
  @Type(() => IndividualSupplierDto)
  individualSupplier?: IndividualSupplierDto;
}
