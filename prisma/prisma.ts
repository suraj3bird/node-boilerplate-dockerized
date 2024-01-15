import { PrismaClient } from '@prisma/client';

// setup prisma variable, new instance if production else check global variable and process accordingly.
declare global {
  var __PRISMA_CLIENT: PrismaClient | undefined;
}
const prisma =
  process.env.NODE_ENV === 'production'
    ? new PrismaClient()
    : global.__PRISMA_CLIENT ||
      (global.__PRISMA_CLIENT = new PrismaClient());

if (process.env.NODE_ENV !== 'production') {
  prisma.$connect();
}

export * from '@prisma/client';
export { prisma };