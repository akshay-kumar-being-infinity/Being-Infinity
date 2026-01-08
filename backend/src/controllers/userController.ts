import { Request, Response } from 'express'
import { prisma } from '../lib/prisma.js';
import { Prisma } from '../generated/prisma/client.js';
import { Role } from '../generated/prisma/client.js';

const dummyUsers = [
  { email: 'john.doe@example.com', name: 'John Doe', providerUserId: 'dummy_001' },
  { email: 'jane.smith@test.com', name: 'Jane Smith', providerUserId: 'dummy_002' },
  { email: 'admin@bootcamp.com', name: 'Admin User', providerUserId: 'dummy_003' },
  { email: 'dev@code.com', name: 'Dev Tester', providerUserId: 'dummy_004' },
];

let userIndex = 0;

export async function createRandomUser(req: Request, res: Response) {
  try {
    console.log('🆕 Creating random user...');

    if (process.env.NODE_ENV !== 'development') {
      console.log('🚫 Random user creation blocked in production');
      return res.status(403).json({ message: 'Disabled in production' });
    }

    const dummy = dummyUsers[userIndex % dummyUsers.length];
    userIndex++;

    const userData = {
      email: dummy.email,
      provider: 'dummy',
      providerUserId: `${dummy.providerUserId}_${Date.now()}`,  // Unique timestamp
      name: dummy.name,
      emailVerified: userIndex % 2 === 0,
      role: userIndex % 4 === 2 ? Role.ADMIN : Role.USER,
      isActive: true,
    };

    console.log('📝 Generated user data:', userData);

    const user = await prisma.user.create({
      data: userData,
      select: {
        id: true,
        email: true,
        provider: true,
        providerUserId: true,
        name: true,
        emailVerified: true,
        role: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    console.log(`✅ Created user ID: ${user.id.toString()}, Name: ${user.name}`);
    
    res.status(201).json({
      success: true,
      message: 'Dummy user created successfully',
      user: {
        ...user,
        id: user.id.toString(),
      },
    });

  } catch (err) {
    console.error('❌ Error creating random user:', err);
    console.error('💡 Error details:', {
      message: err instanceof Error ? err.message : 'Unknown error',
      stack: err instanceof Error ? err.stack : undefined,
    });
    
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === 'P2002') {
      return res.status(409).json({ message: 'User with this providerUserId already exists' });
    }
    
    res.status(500).json({ message: 'Failed to create random user' });
  }
}

export async function getAllUsers(req: Request, res: Response) {
  try {
    const users = await prisma.user.findMany({
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        email: true,
        provider: true,
        providerUserId: true,
        name: true,
        emailVerified: true,
        role: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    const serializedUsers = users.map(user => ({
      ...user,
      id: user.id.toString(),
    }));

    res.status(200).json(serializedUsers);
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ message: 'Failed to fetch users' });
  }
}
