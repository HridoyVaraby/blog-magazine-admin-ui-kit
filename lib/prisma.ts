/**
 * Prisma Client Stub
 * 
 * This is a placeholder for the Prisma database client.
 * Replace this with your actual Prisma setup or another ORM.
 * 
 * To set up Prisma:
 * 1. Run: pnpm add @prisma/client prisma
 * 2. Run: npx prisma init
 * 3. Configure your schema.prisma
 * 4. Run: npx prisma generate
 * 5. Replace this stub with the actual client
 */

// Stub export - replace with actual Prisma client
export const prisma = {
  // Mock methods to prevent import errors
  $connect: async () => console.warn("Prisma stub: $connect called"),
  $disconnect: async () => console.warn("Prisma stub: $disconnect called"),
} as any;

export default prisma;
