import prisma from '../config/db.js';

export async function findUserByUsername(username) {
  return prisma.user.findUnique({
    where: { username }
  });
}

export async function findUserById(id) {
  return prisma.user.findUnique({
    where: { id }
  });
}

export async function createUser(username, password) {
  return prisma.user.create({
    data: {
      username,
      password
    }
  });
}