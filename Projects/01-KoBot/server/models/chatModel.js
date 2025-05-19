import prisma from '../config/db.js';

export async function saveChatMessage(userId, userMessage, botResponse) {
  return prisma.chatMessage.create({
    data: {
      userId,
      userMessage,
      botResponse
    }
  });
}

export async function getChatHistory(userId) {
  return prisma.chatMessage.findMany({
    where: { userId },
    orderBy: { createdAt: 'asc' }
  });
}

export async function deleteChatHistory(userId) {
  return prisma.chatMessage.deleteMany({
    where: { userId }
  });
}