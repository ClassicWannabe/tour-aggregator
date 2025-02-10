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
import { SupplierContactType, SupplierType } from '@prisma/client';
import { VerifyEmailDto } from './dto/verify-email.dto';
import { CustomConfigService } from '../../config/custom-config.service';
import { MailerService } from '../../mailer/mailer.service';

@Injectable()
export class SuppliersService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
    private readonly configService: CustomConfigService,
    private readonly mailerService: MailerService,
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
    let supplierType: SupplierType = SupplierType.INDIVIDUAL_SUPPLIER;
    if (companySupplier) {
      supplierType = SupplierType.COMPANY_SUPPLIER;
    }

    const existingSupplier = await this.prismaService.supplier.findFirst({
      where: {
        OR: [
          {
            email: signUpSupplierDto.email,
          },
          { phone: signUpSupplierDto.phone },
        ],
      },
      select: {
        email: true,
        phone: true,
      },
    });
    if (existingSupplier) {
      throw new BadRequestException('Duplicate email/phone');
    }

    const newSupplier = await this.prismaService.supplier.create({
      data: {
        ...supplierInfo,
        email: null,
        password,
        companySupplier: { create: companySupplier },
        individualSupplier: { create: individualSupplier },
        type: supplierType,
      },
      include: { individualSupplier: true, companySupplier: true },
    });

    await this.sendEmailVerification(signUpSupplierDto.email, newSupplier.id);

    return newSupplier;
  }

  async resendEmailVerification(email: string) {
    const supplier = await this.prismaService.supplier.findFirst({
      where: { email },
      select: {
        id: true,
      },
    });

    if (supplier) {
      throw new BadRequestException('Email is verified/occupied');
    }

    const verificationCode =
      await this.prismaService.supplierContactVerification.findFirst({
        where: { contact: email },
        select: {
          id: true,
          createdAt: true,
          supplier: { select: { id: true } },
        },
      });

    if (!verificationCode) {
      throw new BadRequestException('Email does not exist');
    }

    const resendSeconds = this.configService.getOrFailNumber(
      'SUPPLIER_VERIFICATION_CODE_RESEND_SECONDS',
    );
    const minDate = DateTime.now().minus({ second: resendSeconds });

    const isRecentVerificationCodeExists =
      DateTime.fromJSDate(verificationCode.createdAt) > minDate;

    if (isRecentVerificationCodeExists) {
      throw new BadRequestException('Cannot send email verification code yet');
    }

    await this.sendEmailVerification(email, verificationCode.supplier.id);
  }

  private async sendEmailVerification(email: string, supplierId: string) {
    const expireSeconds = this.configService.getOrFailNumber(
      'SUPPLIER_VERIFICATION_CODE_EXPIRATION_SECONDS',
    );
    const codeExpiresAt = DateTime.now()
      .plus({ second: expireSeconds })
      .toJSDate();
    const newCode = this.generateOTP();

    await this.prismaService.supplierContactVerification.create({
      data: {
        supplierId: supplierId,
        code: newCode,
        contact: email,
        type: SupplierContactType.EMAIL,
        codeExpiresAt,
      },
    });

    await this.mailerService.sendVerificationEmail(email, newCode);
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
    const supplier = await this.prismaService.supplier.findFirst({
      select: { id: true, email: true, password: true },
      where: { email: signInSupplierDto.email },
    });

    if (!supplier) {
      throw new NotFoundException('Supplier not found');
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
      email: signInSupplierDto.email,
    };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async findOne(id: string) {
    return this.prismaService.supplier.findUnique({
      where: { id },
      include: { individualSupplier: true, companySupplier: true },
    });
  }

  async verifyEmail(verifyEmailDto: VerifyEmailDto) {
    const supplier = await this.prismaService.supplier.findFirst({
      where: { email: verifyEmailDto.email },
    });
    if (supplier) {
      throw new BadRequestException('Email is already verified');
    }

    const verificationCode =
      await this.prismaService.supplierContactVerification.findFirst({
        where: {
          contact: verifyEmailDto.email,
          codeExpiresAt: { gt: new Date() },
          contactVerifiedAt: null,
        },
        select: {
          id: true,
          code: true,
        },
        orderBy: { createdAt: 'desc' },
      });

    if (!verificationCode) {
      throw new NotFoundException('Not found');
    }

    const isCodeValid = verificationCode.code === verifyEmailDto.code;

    if (!isCodeValid) {
      throw new BadRequestException('Wrong verification code');
    }

    await this.prismaService.supplierContactVerification.update({
      where: { id: verificationCode.id },
      data: {
        contactVerifiedAt: new Date(),
        supplier: { update: { email: verifyEmailDto.email } },
      },
    });
  }
}
