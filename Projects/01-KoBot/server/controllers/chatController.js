import { getChatHistory, saveChatMessage, deleteChatHistory } from '../models/chatModel.js';
import { callLLM } from '../services/llmService.js';

export async function sendMessage(req, res) {
  const { id: userId } = req.user;
  const { message } = req.body;
  
  if (!message) {
    return res.status(400).json({ message: 'Message is required' });
  }

  try {
    const botResponse = await callLLM(message);
    
    await saveChatMessage(userId, message, botResponse);
    
    res.json({ bot: botResponse });
  } catch (error) {
    console.error('Error in chat controller:', error);
    res.status(500).json({ message: 'Failed to process message' });
  }
}

export async function getHistory(req, res) {
  const { id: userId } = req.user;
  
  try {
    const history = await getChatHistory(userId);
    
    // Transform the data structure to match frontend expectations
    const formattedHistory = history.map(msg => ({
      userMessage: msg.userMessage,
      botResponse: msg.botResponse
    }));
    
    res.json({ history: formattedHistory });
  } catch (error) {
    console.error('Error fetching chat history:', error);
    res.status(500).json({ message: 'Failed to fetch chat history' });
  }
}

export async function clearHistory(req, res) {
  const { id: userId } = req.user;
  
  try {
    await deleteChatHistory(userId);
    res.json({ message: 'Chat history cleared successfully' });
  } catch (error) {
    console.error('Error clearing chat history:', error);
    res.status(500).json({ message: 'Failed to clear chat history' });
  }
}