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
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { SupplierJwtPayload } from './types';
import { SUPPLIER_PASSWORD_SALT_ROUNDS } from './constants';
import { SignInSupplierDto } from './dto/sign-in-supplier.dto';
import { SupplierContactType, SupplierType } from '@prisma/client';
import { VerifyEmailDto } from './dto/verify-email.dto';
import { CustomConfigService } from 'src/config/custom-config.service';
import { MailerService } from 'src/mailer/mailer.service';
import { FileManagerService } from '../file-manager/file-manager.service';
import { MemoryStoredFile } from 'nestjs-form-data';

@Injectable()
export class SuppliersService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
    private readonly configService: CustomConfigService,
    private readonly mailerService: MailerService,
    private readonly fileManagerService: FileManagerService,
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

  async findOneSupplier(id: string) {
    const supplier = await this.prismaService.supplier.findUnique({
      where: { id },
      include: { individualSupplier: true, companySupplier: true, photo: true },
    });

    if (!supplier) {
      throw new NotFoundException('Supplier not found');
    }

    return supplier;
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

  async uploadProfilePhoto(photo: MemoryStoredFile, supplierId: string) {
    const existingPhoto =
      await this.prismaService.supplierProfilePhotoUpload.findUnique({
        where: { supplierId },
        select: { id: true },
      });
    if (existingPhoto) {
      await this.deleteProfilePhoto(existingPhoto.id, supplierId);
    }

    const uploadedPhoto = await this.fileManagerService.uploadPhoto({
      photo,
      supplierId,
    });

    return this.prismaService.supplierProfilePhotoUpload.create({
      data: {
        supplierId,
        originalStorageLink: uploadedPhoto.original.url,
        originalStorageKey: uploadedPhoto.original.key,
        compressedMediumStorageLink: uploadedPhoto.medium.url,
        compressedMediumStorageKey: uploadedPhoto.medium.key,
        compressedPreviewStorageLink: uploadedPhoto.preview.url,
        compressedPreviewStorageKey: uploadedPhoto.preview.key,
      },
      select: {
        id: true,
        originalStorageLink: true,
        compressedMediumStorageLink: true,
        compressedPreviewStorageLink: true,
      },
    });
  }

  async deleteProfilePhoto(photoId: string, supplierId: string) {
    const profilePhoto =
      await this.prismaService.supplierProfilePhotoUpload.findUnique({
        where: { id: photoId, supplierId },
        select: {
          originalStorageKey: true,
          compressedMediumStorageKey: true,
          compressedPreviewStorageKey: true,
        },
      });
    if (!profilePhoto) {
      throw new NotFoundException(
        `Couldn't find profile photo by ID: ${photoId}`,
      );
    }
    const keys = [
      profilePhoto.originalStorageKey,
      profilePhoto.compressedMediumStorageKey,
      profilePhoto.compressedPreviewStorageKey,
    ];
    await this.fileManagerService.deleteFiles(keys);

    return this.prismaService.supplierProfilePhotoUpload.delete({
      where: { id: photoId },
      select: { id: true },
    });
  }

  async uploadCertificate(certificate: MemoryStoredFile, supplierId: string) {
    const uploadedCertificate = await this.fileManagerService.uploadFile({
      file: certificate,
      supplierId,
    });

    return this.prismaService.supplierCertificateUpload.create({
      data: {
        storageLink: uploadedCertificate.url,
        storageKey: uploadedCertificate.key,
      },
      select: {
        id: true,
        storageLink: true,
      },
    });
  }

  async deleteCertificates(certificateIds: string[], supplierId: string) {
    const certificates =
      await this.prismaService.supplierCertificateUpload.findMany({
        where: { id: { in: certificateIds }, supplierId },
        select: {
          storageKey: true,
        },
      });
    if (certificates.length !== certificateIds.length) {
      throw new NotFoundException(
        `Couldn't find certificates by ID: ${certificateIds.join(', ')}`,
      );
    }
    const keys = certificates.map((certificate) => certificate.storageKey);
    await this.fileManagerService.deleteFiles(keys);

    return this.prismaService.supplierProfilePhotoUpload.deleteMany({
      where: { id: { in: certificateIds } },
    });
  }
}
