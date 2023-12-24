import { PrismaClient } from '@prisma/client';

// Create an instance of PrismaClient
const prisma = new PrismaClient();

// Export the prisma instance for use in other modules
export default prisma;
