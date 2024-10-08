import * as bcrypt from 'bcrypt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SignUpSupplierDto } from './dto/sign-up-supplier.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { SupplierJwtPayload } from './types';
import { SUPPLIER_PASSWORD_SALT_ROUNDS } from './constants';
import { SignInSupplierDto } from './dto/sign-in-supplier.dto';

@Injectable()
export class SuppliersService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(signUpSupplierDto: SignUpSupplierDto) {
    signUpSupplierDto.password = await bcrypt.hash(
      signUpSupplierDto.password,
      SUPPLIER_PASSWORD_SALT_ROUNDS,
    );

    return this.prismaService.supplier.create({
      data: { ...signUpSupplierDto, isEmailVerified: false },
    });
  }

  async signIn(
    signInSupplierDto: SignInSupplierDto,
  ): Promise<{ access_token: string }> {
    const supplier = await this.prismaService.supplier.findUnique({
      select: { id: true, email: true, password: true },
      where: { email: signInSupplierDto.email },
    });
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
}
