import app from './app.js';
import dotenv from 'dotenv';
import prisma from './config/db.js';

dotenv.config();

const PORT = process.env.PORT || 5000;

// Connect to Prisma and start server
async function startServer() {
  try {
    // Test the database connection
    await prisma.$connect();
    console.log('Connected to database successfully');
    
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to connect to the database:', error);
    process.exit(1);
  }
}

// Handle shutdown gracefully
process.on('SIGINT', async () => {
  await prisma.$disconnect();
  process.exit(0);
});

startServer();