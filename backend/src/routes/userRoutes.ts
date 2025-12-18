//Routes for user-related endpoints
import { Router } from 'express'
import { createRandomUser, getAllUsers } from '../controllers/userController.js'
import { requireAuth } from '../middlewares/authMiddleware.js'

const userRouter = Router()
userRouter.get('/all', getAllUsers)
userRouter.get('/create', requireAuth, createRandomUser)

export default userRouter