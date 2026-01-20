import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function resetDatabase() {
  // Hapus semua data (auto increment bakal reset)
  await prisma.book.deleteMany();
  await prisma.member.deleteMany();

  // Reset auto increment manual (kalau perlu)
  await prisma.$executeRaw`ALTER TABLE Book AUTO_INCREMENT = 1`;
  await prisma.$executeRaw`ALTER TABLE Member AUTO_INCREMENT = 1`;

  console.log('✅ Database reset complete!');
}

resetDatabase()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());
