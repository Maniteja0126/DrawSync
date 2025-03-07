import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config.js';



export const middleware = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const token = req.headers.authorization ?? '';
    if (!token) {
      return 
      res.status(403).json({ message: 'Unauthorized' });
    }

    if (!JWT_SECRET) {
      throw new Error('JWT_SECRET is not defined');
    }

    const decoded = jwt.verify(token, JWT_SECRET) as unknown;

    if (typeof decoded === 'object' && decoded !== null && 'userId' in decoded) {
      const { userId } = decoded as { userId: string };
      req.userId = userId;  
      next(); 
    } else {
      res.status(403).json({ message: 'Unauthorized' });
    }
  } catch (error) {
    console.error(error); 
    res.status(403).json({ message: 'Invalid Token' });
  }
};
