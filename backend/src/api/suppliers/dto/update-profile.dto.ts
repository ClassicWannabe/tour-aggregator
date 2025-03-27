import { IntersectionType, PartialType, PickType } from '@nestjs/swagger';
import { SignUpSupplierDto } from './sign-up-supplier.dto';
import { DeleteCertificatesDto } from 'src/api/suppliers/dto/delete-certificates.dto';

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
) {}
