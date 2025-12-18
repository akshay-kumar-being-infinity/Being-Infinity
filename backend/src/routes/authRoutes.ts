import { Router } from 'express';
import { googleAuth } from '../controllers/authController.js';

const authRouter = Router();

authRouter.post('/google', googleAuth);

export default authRouter;
