import * as bcrypt from 'bcrypt';
import crypto from 'crypto';
import { DateTime } from 'luxon';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { SignUpSupplierDto } from './dto/sign-up-supplier.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { SupplierJwtPayload } from './types';
import { SUPPLIER_PASSWORD_SALT_ROUNDS } from './constants';
import { SignInSupplierDto } from './dto/sign-in-supplier.dto';
import { SupplierType } from '@prisma/client';
import { VerifyEmailDto } from './dto/verify-email.dto';
import { CustomConfigService } from '../../config/custom-config.service';

@Injectable()
export class SuppliersService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
    private readonly configService: CustomConfigService,
  ) {}

  async signUp(signUpSupplierDto: SignUpSupplierDto) {
    const password = await bcrypt.hash(
      signUpSupplierDto.password,
      SUPPLIER_PASSWORD_SALT_ROUNDS,
    );

    const { individualSupplier, companySupplier, ...supplierInfo } =
      signUpSupplierDto;

    if (companySupplier && individualSupplier) {
      throw new BadRequestException(
        'Provide either company or individual supplier payload',
      );
    }
    let supplierType: SupplierType = SupplierType.IndividualSupplier;
    if (companySupplier) {
      supplierType = SupplierType.CompanySupplier;
    }

    const newSupplier = await this.prismaService.supplier.create({
      data: {
        ...supplierInfo,
        password,
        companySupplier: { create: companySupplier },
        individualSupplier: { create: individualSupplier },
        type: supplierType,
      },
      include: { individualSupplier: true, companySupplier: true },
    });

    await this.sendEmailVerification(newSupplier.email);

    return newSupplier;
  }

  async sendEmailVerification(email: string) {
    const supplier = await this.prismaService.supplier.findUnique({
      where: { email },
      select: {
        id: true,
        emailVerifiedAt: true,
        verificationCodes: {
          select: { createdAt: true },
          where: { expireAt: { gt: new Date() } },
        },
      },
    });

    if (!supplier) {
      throw new NotFoundException('Supplier not found');
    }

    if (supplier.emailVerifiedAt) {
      throw new BadRequestException('Email is already verified');
    }

    const resendSeconds = this.configService.getOrFail<number>(
      'SUPPLIER_VERIFICATION_CODE_RESEND_SECONDS',
    );
    const minDate = DateTime.now().plus({ second: resendSeconds });
    const isRecentVerificationCodeExists = supplier.verificationCodes.some(
      (verificationCode) =>
        DateTime.fromJSDate(verificationCode.createdAt) < minDate,
    );

    if (isRecentVerificationCodeExists) {
      throw new BadRequestException('Cannot send email verification code yet');
    }

    const expireSeconds = this.configService.getOrFail<number>(
      'SUPPLIER_VERIFICATION_CODE_EXPIRATION_SECONDS',
    );
    const expireAt = DateTime.now().plus({ second: expireSeconds }).toJSDate();
    const newCode = this.generateOTP();

    await this.prismaService.verificationCode.create({
      data: { expireAt, supplierId: supplier.id, code: newCode },
    });
  }

  private generateOTP() {
    const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    let otp = '';
    for (let i = 0; i < 6; i++) {
      otp += numbers[crypto.randomInt(numbers.length)];
    }
    return otp;
  }

  async signIn(
    signInSupplierDto: SignInSupplierDto,
  ): Promise<{ access_token: string }> {
    const supplier = await this.prismaService.supplier.findUnique({
      select: { id: true, email: true, password: true, emailVerifiedAt: true },
      where: { email: signInSupplierDto.email },
    });

    if (!supplier) {
      throw new NotFoundException('Supplier not found');
    }

    if (!supplier.emailVerifiedAt) {
      throw new BadRequestException('Email not verified');
    }

    const passwordMatch = await bcrypt.compare(
      signInSupplierDto.password,
      supplier.password,
    );

    if (!passwordMatch) {
      throw new UnauthorizedException();
    }

    const payload: SupplierJwtPayload = {
      sub: supplier.id,
      email: supplier.email,
    };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async findOne(id: string) {
    return this.prismaService.supplier.findUnique({
      where: { id },
    });
  }

  async verifyEmail(verifyEmailDto: VerifyEmailDto) {
    const supplier = await this.prismaService.supplier.findUnique({
      where: { email: verifyEmailDto.email },
      select: {
        id: true,
        emailVerifiedAt: true,
        verificationCodes: {
          select: { code: true },
          where: { expireAt: { gt: new Date() } },
        },
      },
    });

    if (!supplier) {
      throw new NotFoundException('Supplier not found');
    }

    if (supplier.emailVerifiedAt) {
      throw new BadRequestException('Email is already verified');
    }

    const verificationCodeExists = supplier.verificationCodes.some(
      (verificationCode) => verificationCode.code === verifyEmailDto.code,
    );

    if (!verificationCodeExists) {
      throw new BadRequestException('Wrong verification code');
    }

    await this.prismaService.supplier.update({
      where: { id: supplier.id },
      data: { emailVerifiedAt: new Date() },
    });
  }
}
