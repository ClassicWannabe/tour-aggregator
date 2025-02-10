import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  HttpStatus,
  HttpCode,
  Delete,
  Param,
} from '@nestjs/common';
import { SuppliersService } from './suppliers.service';
import { SignUpSupplierDto } from './dto/sign-up-supplier.dto';
import { ApiTags, ApiBearerAuth, ApiConsumes } from '@nestjs/swagger';
import { SupplierAuthGuard } from './supplier-auth.guard';
import { SignInSupplierDto } from './dto/sign-in-supplier.dto';
import { SupplierJwt } from './supplier-jwt.decorator';
import { SupplierJwtBody } from './types';
import { VerifyEmailDto } from './dto/verify-email.dto';
import { SendEmailVerificationDto } from './dto/send-email-verification.dto';
import { FormDataRequest } from 'nestjs-form-data';
import { DeleteProfilePhotoDto } from './dto/delete-profile-photo.dto';
import { UploadProfilePhotoDto } from './dto/upload-profile-photo.dto';
import { UploadCertificateDto } from './dto/upload-certificate.dto';
import { DeleteCertificatesDto } from './dto/delete-certificates.dto';

@Controller('suppliers')
@ApiTags('Suppliers')
export class SuppliersController {
  constructor(private readonly suppliersService: SuppliersService) {}

  @Post('sign-up')
  signUp(@Body() signUpSupplierDto: SignUpSupplierDto) {
    return this.suppliersService.signUp(signUpSupplierDto);
  }

  @Post('sign-in')
  signIn(@Body() signInSupplierDto: SignInSupplierDto) {
    return this.suppliersService.signIn(signInSupplierDto);
  }

  @Post('send-email-verification')
  @HttpCode(HttpStatus.NO_CONTENT)
  sendEmailVerification(
    @Body() sendEmailVerificationDto: SendEmailVerificationDto,
  ) {
    return this.suppliersService.resendEmailVerification(
      sendEmailVerificationDto.email,
    );
  }

  @Post('verify-email')
  @HttpCode(HttpStatus.NO_CONTENT)
  verifyEmail(@Body() verifyEmailDto: VerifyEmailDto) {
    return this.suppliersService.verifyEmail(verifyEmailDto);
  }

  @ApiBearerAuth()
  @UseGuards(SupplierAuthGuard)
  @Get('me')
  getInfo(@SupplierJwt() supplier: SupplierJwtBody) {
    return this.suppliersService.findOneSupplier(supplier.sub);
  }

  @Post('profile-photo')
  @ApiBearerAuth()
  @UseGuards(SupplierAuthGuard)
  @FormDataRequest()
  @ApiConsumes('multipart/form-data')
  uploadProfilePhoto(
    @Body() uploadPhotoDto: UploadProfilePhotoDto,
    @SupplierJwt() supplier: SupplierJwtBody,
  ) {
    return this.suppliersService.uploadProfilePhoto(
      uploadPhotoDto.photo,
      supplier.sub,
    );
  }

  @Delete('profile-photo/:id')
  @ApiBearerAuth()
  @UseGuards(SupplierAuthGuard)
  deleteProfilePhoto(
    @Param() params: DeleteProfilePhotoDto,
    @SupplierJwt() supplier: SupplierJwtBody,
  ) {
    return this.suppliersService.deleteProfilePhoto(
      params.photoId,
      supplier.sub,
    );
  }

  @Post('certificate')
  @ApiBearerAuth()
  @UseGuards(SupplierAuthGuard)
  @FormDataRequest()
  @ApiConsumes('multipart/form-data')
  uploadCertificate(
    @Body() uploadCertificateDto: UploadCertificateDto,
    @SupplierJwt() supplier: SupplierJwtBody,
  ) {
    return this.suppliersService.uploadCertificate(
      uploadCertificateDto.certificate,
      supplier.sub,
    );
  }

  @Delete('certificate')
  @ApiBearerAuth()
  @UseGuards(SupplierAuthGuard)
  deleteCertificates(
    @Body() deleteCertificatesDto: DeleteCertificatesDto,
    @SupplierJwt() supplier: SupplierJwtBody,
  ) {
    return this.suppliersService.deleteCertificates(
      deleteCertificatesDto.certificateIds,
      supplier.sub,
    );
  }
}
