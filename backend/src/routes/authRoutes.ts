import express from 'express'
import { loginUser, registerUser } from '../controller/userController'
const route = express.Router()

route.post('/register', registerUser)
route.post('/login', loginUser)

export const authRoutes = route