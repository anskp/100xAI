import jwt from 'jsonwebtoken';
import { findUserById } from '../models/userModel.js';

export async function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized - No token provided' });
  }
  
  const token = authHeader.split(' ')[1];
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await findUserById(decoded.id);
    
    if (!user) {
      return res.status(401).json({ message: 'Unauthorized - Invalid user' });
    }
    
    req.user = { id: user.id, username: user.username };
    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    return res.status(401).json({ message: 'Unauthorized - Invalid token' });
  }
}