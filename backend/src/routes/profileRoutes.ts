// routes/profile.ts
import { Router } from 'express';
import { createProfile, getOwnProfile, updateProfile } from '../controllers/profileController.js';
import { requireAuth } from '../middlewares/authMiddleware.js'

const profileRouter = Router();

/**
 * POST /api/profiles/create
 */
profileRouter.post('/create',
  requireAuth,
  /**
   * @swagger
   * /api/profiles/create:
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
   *               firstName: { type: string, example: "John" }
   *               lastName: { type: string, example: "Doe" }
   *               countryCode: { type: string, example: "+91" }
   *               phone: { type: string, example: "9876543210" }
   *               isStudent: { type: boolean, example: true }
   *               college: { type: string, example: "IIT Bombay", nullable: true }
   *               rollNumber: { type: string, example: "CS2023001", nullable: true }
   *               mentorpickUsername: { type: string, example: "john_mp", nullable: true }
   *               leetcodeUsername: { type: string, example: "john_lc", nullable: true }
   *               codechefUsername: { type: string, example: "john_cc", nullable: true }
   *               codeforcesUsername: { type: string, example: "john_cf", nullable: true }
   *               githubUsername: { type: string, example: "johndoe", nullable: true }
   *               linkedinUsername: { type: string, example: "john_linkedin", nullable: true }
   *     responses:
   *       201:
   *         description: Profile created successfully
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
   *                     lastName: { type: string, nullable: true }
   *                     phone: { type: string, nullable: true }
   *                     githubUsername: { type: string, nullable: true }
   *                     createdAt: { type: string, format: date-time }
   *       409:
   *         description: Profile already exists
   */
  createProfile
);

/**
 * GET /api/profiles/me
 */
profileRouter.get('/me',
  requireAuth,
  /**
   * @swagger
   * /api/profiles/me:
   *   get:
   *     summary: Get Own Profile
   *     tags: [Profiles]
   *     security:
   *       - bearerAuth: []
   *     responses:
   *       200:
   *         description: Profile data retrieved successfully
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 success: { type: boolean, example: true }
   *                 profile:
   *                   type: object
   *                   properties:
   *                     id: { type: string }
   *                     firstName: { type: string, nullable: true }
   *                     lastName: { type: string, nullable: true }
   *                     countryCode: { type: string, nullable: true }
   *                     phone: { type: string, nullable: true }
   *                     isStudent: { type: boolean, nullable: true }
   *                     college: { type: string, nullable: true }
   *                     rollNumber: { type: string, nullable: true }
   *                     mentorpickUsername: { type: string, nullable: true }
   *                     leetcodeUsername: { type: string, nullable: true }
   *                     codechefUsername: { type: string, nullable: true }
   *                     codeforcesUsername: { type: string, nullable: true }
   *                     githubUsername: { type: string, nullable: true }
   *                     linkedinUsername: { type: string, nullable: true }
   *                     createdAt: { type: string, format: date-time }
   *       404:
   *         description: Profile not found
   *       401:
   *         description: Unauthorized
   */
  getOwnProfile
);

/**
 * PUT /api/profiles/update
 */
profileRouter.put('/update',
  requireAuth,
  /**
   * @swagger
   * /api/profiles/update:
   *   put:
   *     summary: Update Own Profile
   *     tags: [Profiles]
   *     security:
   *       - bearerAuth: []
   *     requestBody:
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               firstName: { type: string, example: "John", nullable: true }
   *               lastName: { type: string, example: "Doe", nullable: true }
   *               countryCode: { type: string, example: "+91", nullable: true }
   *               phone: { type: string, example: "9876543210", nullable: true }
   *               isStudent: { type: boolean, example: true }
   *               college: { type: string, example: "IIT Bombay", nullable: true }
   *               rollNumber: { type: string, example: "CS2023001", nullable: true }
   *               mentorpickUsername: { type: string, example: "john_mp", nullable: true }
   *               leetcodeUsername: { type: string, example: "john_lc", nullable: true }
   *               codechefUsername: { type: string, example: "john_cc", nullable: true }
   *               codeforcesUsername: { type: string, example: "john_cf", nullable: true }
   *               githubUsername: { type: string, example: "johndoe", nullable: true }
   *               linkedinUsername: { type: string, example: "john_linkedin", nullable: true }
   *     responses:
   *       200:
   *         description: Profile updated successfully
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 success: { type: boolean, example: true }
   *                 message: { type: string, example: "Profile updated successfully" }
   *                 profile:
   *                   type: object
   *                   properties:
   *                     id: { type: string }
   *                     firstName: { type: string, nullable: true }
   *                     lastName: { type: string, nullable: true }
   *                     githubUsername: { type: string, nullable: true }
   *                     updatedAt: { type: string, format: date-time }
   *       500:
   *         description: Server error
   */
  updateProfile
);

export default profileRouter;
