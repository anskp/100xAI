import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Clear existing data
  await prisma.chatMessage.deleteMany();
  await prisma.user.deleteMany();

  // Create a test user
  const hashedPassword = await bcrypt.hash('password123', 10);
  const user = await prisma.user.create({
    data: {
      username: 'testuser',
      password: hashedPassword,
    },
  });

  console.log(`Created user: ${user.username}`);

  // Create some sample messages
  const chatMessage1 = await prisma.chatMessage.create({
    data: {
      userId: user.id,
      userMessage: 'Hello, how are you?',
      botResponse: 'I\'m doing well, thank you for asking! How can I help you today?',
    },
  });

  const chatMessage2 = await prisma.chatMessage.create({
    data: {
      userId: user.id,
      userMessage: 'Tell me a joke',
      botResponse: 'Why don\'t scientists trust atoms? Because they make up everything!',
    },
  });

  console.log(`Created ${2} sample chat messages`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });