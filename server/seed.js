const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const users = [
        { name: 'Alice', email: 'alice@example.com' },
        { name: 'Bob', email: 'bob@example.com' },
        { name: 'Charlie', email: 'charlie@example.com' },
        { name: 'David', email: 'david@example.com' },
        { name: 'Eve', email: 'eve@example.com' },
        { name: 'Frank', email: 'frank@example.com' },
        { name: 'Grace', email: 'grace@example.com' },
        { name: 'Hannah', email: 'hannah@example.com' },
        { name: 'Ivan', email: 'ivan@example.com' },
        { name: 'Judy', email: 'judy@example.com' },
    ];

    for (const user of users) {
        await prisma.user.upsert({
            where: { email: user.email },
            update: {},
            create: user,
        });
    }

    console.log('10 users have been seeded.');
}

main()
    .catch((e) => console.error(e))
    .finally(async () => {
        await prisma.$disconnect();
    });
