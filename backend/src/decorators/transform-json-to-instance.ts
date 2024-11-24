import {
  ClassConstructor,
  plainToInstance,
  Transform,
} from 'class-transformer';
import { BadRequestException } from '@nestjs/common';

export function TransformJsonToInstance(cls: ClassConstructor<unknown>) {
  return Transform(
    (params) => {
      try {
        return plainToInstance(cls, JSON.parse(params.value));
      } catch (e) {
        throw new BadRequestException(`Invalid JSON format: ${params.key}`);
      }
    },
    { toClassOnly: true },
  );
}
