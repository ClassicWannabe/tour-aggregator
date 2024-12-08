import { PrismaClient } from '@prisma/client';

import { withPgTrgm } from './extensions/pg-trgm/pg-trgm';

function extendClient(base: PrismaClient) {
  return base.$extends(withPgTrgm());
}

class UntypedExtendedClient extends PrismaClient {
  constructor(options?: ConstructorParameters<typeof PrismaClient>[0]) {
    super(options);

    return extendClient(this) as this;
  }
}

const ExtendedPrismaClient = UntypedExtendedClient as unknown as new (
  options?: ConstructorParameters<typeof PrismaClient>[0],
) => ReturnType<typeof extendClient>;

export { ExtendedPrismaClient };
