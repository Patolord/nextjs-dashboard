import { PrismaClient } from '@prisma/client';

// Declare a global variable type to extend the NodeJS global type
declare global {
  // Prevent TypeScript errors for our custom global variable
  // by declaring it in the global namespace
  var prisma: PrismaClient | undefined;
}

let prisma: PrismaClient;

if (process.env.NODE_ENV === "production") {
  // In production, always create a new Prisma Client
  prisma = new PrismaClient();
} else {
  // In development, use the global `prisma` instance,
  // if it doesn't exist, create a new one
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}

export { prisma };
