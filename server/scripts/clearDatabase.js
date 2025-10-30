const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  await prisma.user.deleteMany({});
  await prisma.oLIS_ORU_ResolutionTracker.deleteMany({});
  console.log('All data deleted!');
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());
