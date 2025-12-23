import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = (): PrismaClient => new PrismaClient();

declare global {
  // eslint-disable-next-line no-var
  var prismaGlobal: PrismaClient | undefined;
}

const prismaClient: PrismaClient = globalThis.prismaGlobal ?? prismaClientSingleton();

if (process.env.NODE_ENV !== "production") {
  globalThis.prismaGlobal = prismaClient;
}

export type { PrismaClient };
export default prismaClient;