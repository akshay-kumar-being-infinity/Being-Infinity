// controllers/profileController.ts
import { Request, Response } from 'express';
import { prisma } from '../lib/prisma.js';
import { Role } from '../generated/prisma/client.js';

interface AuthRequest extends Request {
  user?: { userId: string; role: Role };
}

interface CreateProfileBody {
  firstName?: string;
  lastName?: string;
  rollNumber?: string;
  college?: string;
  githubUsername?: string;
  leetcodeUsername?: string;
  codeforcesUsername?: string;
  codechefUsername?: string;
  mentorpickUsername?: string;
  linkedinUsername?: string;
  phone?: string;
  isStudent?: boolean
  countryCode?: string;
}

// Create User Profile
export async function createProfile(req: AuthRequest, res: Response): Promise<void> {
  try {
    console.log('🆕 Creating profile for user:', req.user?.userId);

    const {
      firstName, lastName, rollNumber, college,
      githubUsername, leetcodeUsername, codeforcesUsername, 
      codechefUsername, mentorpickUsername, linkedinUsername, phone,
      isStudent, countryCode
    } = req.body as CreateProfileBody;

    const userId = BigInt(req.user!.userId);

    console.log('📝 Profile data:', { firstName, lastName, rollNumber, college, githubUsername });

    const existingProfile = await prisma.profile.findUnique({ where: { userId } });
    if (existingProfile) {
      console.log('⚠️ Profile already exists:', existingProfile.id);
      res.status(409).json({ success: false, message: 'Profile exists. Use PUT /api/profiles/me to update.' });
      return;
    }

    const profile = await prisma.profile.create({
      data: {
        userId,
        firstName: firstName || null,
        lastName: lastName || null,
        rollNumber: rollNumber || null,
        college: college || null,
        githubUsername: githubUsername || null,
        leetcodeUsername: leetcodeUsername || null,
        codeforcesUsername: codeforcesUsername || null,
        codechefUsername: codechefUsername || null,
        mentorpickUsername: mentorpickUsername || null,
        linkedinUsername: linkedinUsername || null,
        phone: phone || null,
        isStudent: isStudent ?? false,
        countryCode: countryCode || '+91',
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        rollNumber: true,
        college: true,
        githubUsername: true,
        leetcodeUsername: true,
        codeforcesUsername: true,
        codechefUsername: true,
        mentorpickUsername: true,
        linkedinUsername: true,
        phone: true,
        isStudent: true,
        countryCode: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    console.log(`✅ Profile created ID: ${profile.id} for user ${userId}`);

    res.status(201).json({
      success: true,
      message: 'Profile created successfully',
      profile: {
        ...profile,
        id: profile.id.toString(),
      },
    });

  } catch (error) {
    console.error('❌ Profile creation error:', error);
    res.status(500).json({ success: false, message: 'Failed to create profile' });
  }
}

// Get User Profile
export async function getOwnProfile(req: AuthRequest, res: Response): Promise<void> {
  try {
    console.log(`👤 [GET /profiles/me] userId=${req.user!.userId}`);

    const userId = BigInt(req.user!.userId);

    console.log(`🔍 [PROFILE] Looking up profile for userId=${userId}`);

    const profileData = await prisma.profile.findUnique({
      where: { userId },
      select: {
        id: true, firstName: true, lastName: true, rollNumber: true, college: true,
        githubUsername: true, leetcodeUsername: true, codeforcesUsername: true,
        codechefUsername: true, mentorpickUsername: true, linkedinUsername: true, phone: true,
        isStudent: true, countryCode: true,
        createdAt: true, updatedAt: true,
      },
    });

    if (!profileData) {
      console.log(`❌ [PROFILE/${userId}] No profile found`);
      res.status(404).json({ success: false, message: 'Profile not found. Create one first.' });
      return;
    }

    console.log(`✅ [PROFILE/${profileData.id}] Found for userId=${userId}`);
    console.log(`📤 [GET /profiles/me] Responding with profileId=${profileData.id}`);

    res.status(200).json({
      success: true,
        profile: {
        ...profileData,
        id: profileData.id.toString(),
      },
    });

  } catch (error) {
    console.error(`💥 [GET /profiles/me] userId=${req.user?.userId} error=`, error);
    res.status(500).json({ success: false, message: 'Failed to fetch profile' });
  }
}


// Update User Profile
export async function updateProfile(req: AuthRequest, res: Response): Promise<void> {
  try {
    console.log(`🔄 [PUT /profiles/update] userId=${req.user!.userId}`);

    const userId = BigInt(req.user!.userId);

    const { 
      firstName, lastName, rollNumber, college,
      githubUsername, leetcodeUsername, codeforcesUsername, 
      codechefUsername, mentorpickUsername, linkedinUsername, phone,
      isStudent, countryCode
    } = req.body as CreateProfileBody;

    console.log(`📝 [UPDATE/${userId}] Data:`, { firstName, githubUsername, college });

    const profile = await prisma.profile.upsert({
      where: { userId },
      create: {
        userId,
        firstName: firstName || null,
        lastName: lastName || null,
        rollNumber: rollNumber || null,
        college: college || null,
        githubUsername: githubUsername || null,
        leetcodeUsername: leetcodeUsername || null,
        codeforcesUsername: codeforcesUsername || null,
        codechefUsername: codechefUsername || null,
        mentorpickUsername: mentorpickUsername || null,
        linkedinUsername: linkedinUsername || null,
        phone: phone || null,
        isStudent: isStudent ?? false,
        countryCode: countryCode || '+91',
      },
      update: {
        firstName: firstName || null,
        lastName: lastName || null,
        rollNumber: rollNumber || null,
        college: college || null,
        githubUsername: githubUsername || null,
        leetcodeUsername: leetcodeUsername || null,
        codeforcesUsername: codeforcesUsername || null,
        codechefUsername: codechefUsername || null,
        mentorpickUsername: mentorpickUsername || null,
        linkedinUsername: linkedinUsername || null,
        phone: phone || null,
        isStudent: isStudent ?? false,
        countryCode: countryCode || '+91',
      },
      select: {
        id: true, firstName: true, lastName: true, rollNumber: true, college: true,
        githubUsername: true, leetcodeUsername: true, codeforcesUsername: true,
        codechefUsername: true, mentorpickUsername: true, linkedinUsername: true, phone: true,
        isStudent: true, countryCode: true,
        updatedAt: true,
      },
    });

    console.log(`✅ [UPDATE/${profile.id}] Profile updated for userId=${userId}`);

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
        profile: {
        ...profile,
        id: profile.id.toString(),
      },
    });

  } catch (error) {
    console.error(`💥 [PUT /profiles/update] userId=${req.user?.userId} error=`, error);
    res.status(500).json({ success: false, message: 'Failed to update profile' });
  }
}
