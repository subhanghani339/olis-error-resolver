const { PrismaClient } = require('@prisma/client');
const { seedUsers } = require('./seeds/userSeeds');
const { seedResolutionTracker } = require('./seeds/resolutionTrackerSeeds');

const prisma = new PrismaClient();

async function main() {
    // Seed users
    // await seedUsers(prisma);
    
    // Seed resolution tracker data
    await seedResolutionTracker(prisma);
    
    console.log('All data has been seeded successfully!');
}

main()
    .catch((e) => console.error(e))
    .finally(async () => {
        await prisma.$disconnect();
    });
