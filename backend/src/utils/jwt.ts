import jwt from 'jsonwebtoken';
import { Role } from '../generated/prisma/client.js'

export interface UserPayload {
  userId: string;
  email?: string;
  role?: Role;
}

export const signJwt = (payload: UserPayload): string => {
  return jwt.sign(payload as UserPayload, process.env.JWT_SECRET as any, { 
    expiresIn: process.env.JWT_EXPIRES_IN as any
  });
};

export const verifyJwt = (token: string): UserPayload | null => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET as any) as UserPayload  ;
  } catch {
    return null;
  }
};