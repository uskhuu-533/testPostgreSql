import { PrismaClient } from '@prisma/client'

const globalForPrisma = global as unknown as { prisma: PrismaClient }

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    // Optional: add logging or other configuration
    // log: ['query'], // Uncomment to log queries
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma