import { prisma } from '../lib/prisma.js';
import { signJwt } from '../utils/jwt.js';
import { OAuth2Client } from 'google-auth-library';
import { Request, Response } from 'express';

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID!);

interface GoogleUser {
  sub: string;
  email?: string | null;
  givenName?: string | null;
  familyName?: string | null;
  picture?: string | null;
  emailVerified?: boolean | null;
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

    const rawPayload = ticket.getPayload();
    if (!rawPayload?.sub) {
      res.status(401).json({ message: 'Invalid Google token' });
      return;
    }

    // 🔹 Map snake_case → camelCase ONCE
    const googleUser: GoogleUser = {
      sub: rawPayload.sub,
      email: rawPayload.email ?? null,
      givenName: rawPayload.given_name ?? null,
      familyName: rawPayload.family_name ?? null,
      picture: rawPayload.picture ?? null,
      emailVerified: rawPayload.email_verified ?? null,
    };

    const providerUserId = googleUser.sub;
    const email =
      googleUser.email ?? `google_${providerUserId}@fallback.com`;

    const name =
      googleUser.givenName || googleUser.familyName
        ? `${googleUser.givenName || ''} ${googleUser.familyName || ''}`.trim()
        : null;

    const user = await prisma.user.upsert({
      where: { providerUserId },
      create: {
        email,
        provider: 'google',
        providerUserId,
        name,
        emailVerified: Boolean(googleUser.emailVerified),
        role: 'USER',
        isActive: true,
      },
      update: {
        name,
        emailVerified: Boolean(googleUser.emailVerified),
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
        name: user.name,
        picture: googleUser.picture,
        role: user.role,
      },
    });
  } catch (error) {
    console.error('Google auth error:', error);
    res.status(500).json({
      success: false,
      message: 'Authentication failed',
    });
  }
}
