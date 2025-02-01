import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { SuppliersService } from './suppliers.service';
import { SignUpSupplierDto } from './dto/sign-up-supplier.dto';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { SupplierAuthGuard } from './supplier-auth.guard';
import { SignInSupplierDto } from './dto/sign-in-supplier.dto';
import { SupplierJwt } from './supplier-jwt.decorator';
import { SupplierJwtBody } from './types';
import { VerifyEmailDto } from './dto/verify-email.dto';
import { SendEmailVerificationDto } from './dto/send-email-verification.dto';

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
    return this.suppliersService.sendEmailVerification(
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
    return this.suppliersService.findOne(supplier.sub);
  }
}
