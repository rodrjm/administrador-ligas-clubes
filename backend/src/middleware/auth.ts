import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export type AuthUser = { userId: string; role: string };

export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
  const header = req.headers.authorization;
  if (!header?.startsWith('Bearer ')) return res.status(401).json({ message: 'Unauthorized' });
  const token = header.substring('Bearer '.length);
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET || 'change-me') as AuthUser;
    (req as any).auth = payload;
    next();
  } catch {
    return res.status(401).json({ message: 'Invalid token' });
  }
};


