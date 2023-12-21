import express from 'express'
import { deleteAccount, updateAvatar } from '../controller/userController'
import { upload } from '../middleware/multer'
import { authMiddleware } from '../middleware/auth'
const route = express.Router()

route.patch('/update-avatar', authMiddleware, upload.single('avatar'), updateAvatar)
route.delete('/delete-account', authMiddleware, deleteAccount)

export const userRoutes = route