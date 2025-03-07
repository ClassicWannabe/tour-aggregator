import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@ValidatorConstraint({ async: true })
@Injectable()
export class IsLocationExistsValidator implements ValidatorConstraintInterface {
  constructor(private readonly prisma: PrismaService) {}

  async validate(locationId: string) {
    if (!locationId) {
      return false;
    }
    const location = await this.prisma.location.findUnique({
      select: { id: true },
      where: { id: locationId },
    });
    return !!location;
  }

  defaultMessage(args: ValidationArguments) {
    return `Location with ID ${args.value} does not exist.`;
  }
}
