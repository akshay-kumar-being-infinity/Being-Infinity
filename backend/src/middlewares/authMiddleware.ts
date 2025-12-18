// src/middleware/auth.ts
import type { Request, Response, NextFunction } from 'express';
import { verifyJwt, UserPayload } from '../utils/jwt.js';

export interface AuthRequest extends Request {
  user?: UserPayload;
}

export const requireAuth = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({ message: 'Missing or invalid token' });
      return;
    }

    const token = authHeader.slice(7);
    const payload = verifyJwt(token);

    if (!payload) {
      res.status(401).json({ message: 'Invalid or expired token' });
      return;
    }

    req.user = payload;
    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    res.status(500).json({ message: 'Auth middleware error' });
  }
};
