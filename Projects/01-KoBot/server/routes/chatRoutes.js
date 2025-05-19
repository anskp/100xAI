import express from 'express';
import { sendMessage, getHistory, clearHistory } from '../controllers/chatController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

// Apply auth middleware to all chat routes
router.use(authMiddleware);

router.post('/', sendMessage);
router.get('/history', getHistory);
router.delete('/history', clearHistory);

export default router;