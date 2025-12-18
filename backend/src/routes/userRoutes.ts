//Routes for user-related endpoints
import { Router } from 'express'
import { createRandomUser, getAllUsers } from '../controllers/userController.js'
import { requireAuth } from '../middlewares/authMiddleware.js'

const userRouter = Router()
userRouter.get('/all', 
  /**
   * @swagger
   * /users/all:
   *   get:
   *     summary: Get all users (Public - Latest first)
   *     tags: [Users]
   *     description: Returns all users ordered by createdAt DESC
   *     responses:
   *       200:
   *         description: List of all users (newest first)
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 type: object
   *                 properties:
   *                   id:
   *                     type: string
   *                     example: "1"
   *                   email:
   *                     type: string
   *                     example: "vishal@being-infinity.com"
   *                   name:
   *                     type: string
   *                     example: "Vishal Kumar"
   *                   provider:
   *                     type: string
   *                     example: "google"
   *                   providerUserId:
   *                     type: string
   *                     example: "google-sub-abc123"
   *                   emailVerified:
   *                     type: boolean
   *                     example: true
   *                   role:
   *                     type: string
   *                     enum: [USER, ADMIN]
   *                     example: "USER"
   *                   isActive:
   *                     type: boolean
   *                     example: true
   *                   createdAt:
   *                     type: string
   *                     format: date-time
   *                     example: "2025-12-18T14:20:00Z"
   *       500:
   *         description: Failed to fetch users
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   example: "Failed to fetch users"
   */
  getAllUsers
);

userRouter.get('/create', requireAuth, 
  /**
   * @swagger
   * /users/create:
   *   get:
   *     summary: Create random test user (Authenticated)
   *     tags: [Users]
   *     description: Creates dummy user with random email (dummy_abc123@example.com)
   *     security:
   *       - bearerAuth: []
   *     responses:
   *       201:
   *         description: Random user created successfully
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 id:
   *                   type: string
   *                   example: "2"
   *                 email:
   *                   type: string
   *                   example: "dummy_abc123@example.com"
   *                 name:
   *                   type: string
   *                   example: "Dummy User abc123"
   *                 provider:
   *                   type: string
   *                   example: "google"
   *                 providerUserId:
   *                   type: string
   *                   example: "google-sub-abc123"
   *                 emailVerified:
   *                   type: boolean
   *                   example: false
   *                 role:
   *                   type: string
   *                   enum: [USER, ADMIN]
   *                   example: "USER"
   *                 isActive:
   *                   type: boolean
   *                   example: true
   *                 createdAt:
   *                   type: string
   *                   format: date-time
   *       401:
   *         description: Unauthorized
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   example: "Missing or invalid token"
   *       500:
   *         description: Failed to create user
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   example: "Failed to create user"
   */
  createRandomUser
);


export default userRouter