import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { SuppliersService } from './suppliers.service';
import { SignUpSupplierDto } from './dto/sign-up-supplier.dto';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { SupplierAuthGuard } from './supplier-auth.guard';
import { SignInSupplierDto } from './dto/sign-in-supplier.dto';
import { SupplierJwt } from './supplier-jwt.decorator';
import { SupplierJwtBody } from './types';

@Controller('suppliers')
@ApiTags('Suppliers Controller')
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

  @ApiBearerAuth()
  @UseGuards(SupplierAuthGuard)
  @Get('me')
  getInfo(@SupplierJwt() supplier: SupplierJwtBody) {
    return this.suppliersService.findOne(supplier.sub);
  }
}
