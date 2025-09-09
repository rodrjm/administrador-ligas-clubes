import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export type AuthUser = { userId: string; role: string };

export const requireAuth = (req: Request, res: Response, next: NextFunction): void => {
  const header = req.headers.authorization;
  if (!header?.startsWith('Bearer ')) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }
  const token = header.substring('Bearer '.length);
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET || 'change-me') as AuthUser;
    (req as any).auth = payload;
    next();
  } catch {
    res.status(401).json({ message: 'Invalid token' });
  }
};


