import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { SUPPLIER_JWT_REQUEST_KEY } from './constants';

export const SupplierJwt = createParamDecorator(
  (_: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request[SUPPLIER_JWT_REQUEST_KEY];
  },
);
