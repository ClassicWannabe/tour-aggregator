export interface SupplierJwtPayload {
  sub: string;
  email: string;
}

export interface SupplierJwtBody extends SupplierJwtPayload {
  iat: number;
  exp: number;
}
