import { PrismaClient } from '@prisma/client'

// Create a function to initialize Prisma with error handling
const createPrismaClient = () => {
  try {
    const client = new PrismaClient({
      log: ['error', 'warn'],
    })
    
    // Test connection
    client.$connect()
      .then(() => console.log('✅ Prisma connected successfully'))
      .catch((err) => {
        console.error('❌ Prisma connection error:', err);
        throw err;
      });
    
    return client;
  } catch (error) {
    console.error('Failed to create Prisma client:', error);
    throw error;
  }
}

// Singleton pattern with explicit error handling
const globalForPrisma = globalThis as unknown as { 
  prisma: PrismaClient | undefined 
}

export const prisma = 
  globalForPrisma.prisma || 
  createPrismaClient()

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma
}