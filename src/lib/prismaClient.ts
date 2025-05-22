// import { PrismaClient } from "@prisma/client";

import { PrismaClient } from "@/generated/prisma";

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

let prismaClient: PrismaClient;

try {
  prismaClient = globalThis.prisma ?? new PrismaClient();
  if (process.env.NODE_ENV !== "production") globalThis.prisma = prismaClient;
} catch (error) {
  console.error(
    "💥 Prisma client failed to initialize. Did you run `npx prisma generate`?"
  );
  throw error;
}

export default prismaClient;
