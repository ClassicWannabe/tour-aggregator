import {
  ApiPropertyOptional,
  IntersectionType,
  PartialType,
  PickType,
} from '@nestjs/swagger';
import { SignUpSupplierDto } from './sign-up-supplier.dto';
import { DeleteCertificatesDto } from 'src/api/suppliers/dto/delete-certificates.dto';
import { IsOptional, IsStrongPassword, ValidateIf } from 'class-validator';
import * as lodash from 'lodash';

export class UpdateProfileDto extends PartialType(
  IntersectionType(
    PickType(SignUpSupplierDto, [
      'companySupplier',
      'individualSupplier',
      'aboutMe',
      'socialLinks',
      'email',
      'phone',
    ]),
    PickType(DeleteCertificatesDto, ['certificateIds']),
  ),
) {
  @ApiPropertyOptional({
    description: 'Supplier old password',
    example: '$$$1MySuperVeryStrongPassword1$$$',
  })
  @IsOptional()
  @IsStrongPassword()
  @ValidateIf((dto) => !lodash.isNil(dto.newPassword))
  oldPassword?: string;

  @ApiPropertyOptional({
    description: 'Supplier new password',
    example: '$$$1MySuperVeryStrongPassword1$$$NEW',
  })
  @IsOptional()
  @IsStrongPassword()
  @ValidateIf((dto) => !lodash.isNil(dto.oldPassword))
  newPassword?: string;
}
