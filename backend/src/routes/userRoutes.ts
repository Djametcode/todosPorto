import express from 'express'
import { deleteAccount, getCurrentUser, getMyTodos, updateAvatar } from '../controller/userController'
import { upload } from '../middleware/multer'
import { authMiddleware } from '../middleware/auth'
const route = express.Router()

route.patch('/update-avatar', authMiddleware, upload.single('avatar'), updateAvatar)
route.delete('/delete-account', authMiddleware, deleteAccount)
route.get("/get-current", authMiddleware, getCurrentUser)
route.get('/get-my-todo', authMiddleware, getMyTodos)

export const userRoutes = route