const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

async function seedUsers(prisma) {
     const users = [
    { name: 'Muhammad Subhan', email: 'subhan@gmail.com', password: 'password123' },
    { name: 'Abdul Hafeez', email: 'hafeez@gmail.com', password: 'password123' },
  ];

    for (const user of users) {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    await prisma.user.upsert({
      where: { email: user.email },
      update: {},
      create: { ...user, password: hashedPassword },
    });
  }

    console.log('10 users have been seeded.');
}

module.exports = { seedUsers };
