import { prisma } from '../lib/prisma.js';
import { signJwt } from '../utils/jwt.js';
import { OAuth2Client } from 'google-auth-library';
import { Request, Response } from 'express';
import { Role } from '../generated/prisma/client.js'

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID!);

interface GooglePayload {
  sub: string;
  email?: string | null;
  given_name?: string | null;
  family_name?: string | null;
  picture?: string | null;
  email_verified?: boolean | null;
}

export async function googleAuth(req: Request, res: Response): Promise<void> {
  try {
    const { idToken } = req.body as { idToken: string };

    if (!idToken) {
      res.status(400).json({ message: 'Missing idToken' });
      return;
    }

    const ticket = await googleClient.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT_ID!,
    });

    const payload = ticket.getPayload() as GooglePayload | null;
    if (!payload?.sub) {
      res.status(401).json({ message: 'Invalid Google token' });
      return;
    }

    // ✅ Type-safe fallbacks - Prisma requires string
    const providerUserId = payload.sub;
    const email = payload.email ?? `google_${providerUserId}@fallback.com`;
    const name = payload.given_name || payload.family_name 
      ? `${payload.given_name || ''} ${payload.family_name || ''}`.trim() || `Google User ${providerUserId.slice(-8)}`
      : `Google User ${providerUserId.slice(-8)}`;

    const user = await prisma.user.upsert({
      where: { providerUserId },
      create: {
        email,
        provider: 'google',
        providerUserId,
        name,
        emailVerified: Boolean(payload.email_verified),
        role: Role.USER,
        isActive: true,
      },
      update: {
        name,
        emailVerified: Boolean(payload.email_verified),
      },
    });

    const token = signJwt({
      userId: user.id.toString(),
      email: user.email,
      role: user.role,
    });

    res.status(200).json({
      success: true,
      token,
      user: {
        id: user.id.toString(),
        email: user.email,
        name: user.name || null,
        picture: payload.picture || null,  // ✅ ADD THIS LINE
        role: user.role,
      },
    });
    
  } catch (error) {
    console.error('Google auth error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Authentication failed' 
    });
  }
}