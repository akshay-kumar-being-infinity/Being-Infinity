import { Router } from 'express';
import { googleAuth } from '../controllers/authController.js';

const authRouter = Router();

authRouter.post('/google', 
  /**
   * @swagger
   * /api/auth/google:
   *   post:
   *     summary: Google OAuth Login/Register
   *     tags: [Auth]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required: [idToken]
   *             properties:
   *               idToken:
   *                 type: string
   *                 description: Google OAuth ID Token from client
   *                 example: "eyJhbGciOiJSUzI1NiIs..."
   *     responses:
   *       200:
   *         description: Login/Register successful
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 success:
   *                   type: boolean
   *                   example: true
   *                 token:
   *                   type: string
   *                   description: JWT access token (7 days)
   *                   example: "eyJhbGciOiJIUzI1NiIs..."
   *                 user:
   *                   type: object
   *                   properties:
   *                     id:
   *                       type: string
   *                     email:
   *                       type: string
   *                     name:
   *                       type: string
   *                     role:
   *                       type: string
   *                       enum: [USER, ADMIN]
   *       401:
   *         description: Invalid Google token
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   example: "Invalid Google token"
   *       500:
   *         description: Server error
   */
  googleAuth
);

export default authRouter;
