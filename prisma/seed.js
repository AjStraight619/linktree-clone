const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function createUsersAndLinks() {
  const userData = [
    {
      email: 'user1@example.com',
      name: 'User One',
      avatar: 'https://example.com/avatar1.png',
      Link: {
        create: [
          { title: 'User1 Link1', url: 'https://user1link1.com' },
          { title: 'User1 Link2', url: 'https://user1link2.com' },
        ],
      },
    },
    {
      email: 'user2@example.com',
      name: 'User Two',
      avatar: 'https://example.com/avatar2.png',
      Link: {
        create: [
          { title: 'User2 Link1', url: 'https://user2link1.com' },
          { title: 'User2 Link2', url: 'https://user2link2.com' },
        ],
      },
    },
  ];

  for (const user of userData) {
    await prisma.user.upsert({
      where: { email: user.email },
      update: {},
      create: user,
    });
  }
}

async function main() {
  await createUsersAndLinks();
  console.log('Seed users and links have been inserted.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
