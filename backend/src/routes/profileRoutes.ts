// routes/profile.ts
import { Router } from 'express';
import { createProfile, getOwnProfile, updateProfile } from '../controllers/profileController.js';
import { requireAuth } from '../middlewares/authMiddleware.js'

const profileRouter = Router();

profileRouter.post('/create',
  requireAuth,  // ✅ Your auth middleware
  /**
   * @swagger
   * /profiles/create:
   *   post:
   *     summary: Create User Profile
   *     tags: [Profiles]
   *     security:
   *       - bearerAuth: []
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               firstName: { type: string, example: "John", nullable: true }
   *               lastName: { type: string, example: "Doe", nullable: true }
   *               rollNumber: { type: string, example: "CS2023001", nullable: true }
   *               college: { type: string, example: "IIT Bombay", nullable: true }
   *               githubUsername: { type: string, example: "johndoe", nullable: true }
   *               leetcodeUsername: { type: string, example: "john_lc", nullable: true }
   *               codeforcesUsername: { type: string, example: "john_cf", nullable: true }
   *               codechefUsername: { type: string, example: "john_cc", nullable: true }
   *               mentorpickUsername: { type: string, example: "john_mp", nullable: true }
   *               phoneNumber: { type: string, example: "+919876543210", nullable: true }
   *     responses:
   *       201:
   *         description: Profile created
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 success: { type: boolean, example: true }
   *                 message: { type: string, example: "Profile created successfully" }
   *                 profile:
   *                   type: object
   *                   properties:
   *                     id: { type: string }
   *                     firstName: { type: string, nullable: true }
   *                     githubUsername: { type: string, nullable: true }
   *                     createdAt: { type: string, format: date-time }
   *       409:
   *         description: Profile already exists
   */
  createProfile
);


// GET /api/profiles/me - Get own profile  
profileRouter.get('/me',
  requireAuth,
  /**
   * @swagger
   * /profiles/me:
   *   get:
   *     summary: Get Own Profile
   *     tags: [Profiles]
   *     security:
   *       - bearerAuth: []
   *     responses:
   *       200:
   *         description: Profile data
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 success:
   *                   type: boolean
   *                   example: true
   *                 profile:
   *                   type: object
   *                   properties:
   *                     id: { type: string }
   *                     firstName: { type: string, nullable: true }
   *                     lastName: { type: string, nullable: true }
   *                     rollNumber: { type: string, nullable: true }
   *                     college: { type: string, nullable: true }
   *                     githubUsername: { type: string, nullable: true }
   *                     createdAt: { type: string, format: date-time }
   *       404:
   *         description: Profile not found
   *       401:
   *         description: Unauthorized
   */
  getOwnProfile
);

// routes/profile.ts (Add PUT /profiles/update)
profileRouter.put('/update',
  requireAuth,
  /**
   * @swagger
   * /profiles/update:
   *   put:
   *     summary: Update Own Profile
   *     tags: [Profiles]
   *     security: [bearerAuth: []]
   *     requestBody:
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               firstName: { type: string, example: "John", nullable: true }
   *               githubUsername: { type: string, example: "johndoe", nullable: true }
   *               # ... all fields same as POST
   *     responses:
   *       200:
   *         description: Profile updated
   *       500:
   *         description: Server error
   */
  updateProfile
);

export default profileRouter;
