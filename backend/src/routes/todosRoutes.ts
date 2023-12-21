import express from 'express'
import { createTodos, deleteTodos, updateTodos } from '../controller/todosController'
import { authMiddleware } from '../middleware/auth'
const route = express.Router()

route.post('/create-todos', authMiddleware, createTodos)
route.patch('/update-todos/:id', authMiddleware, updateTodos)
route.delete('/delete-todos/:id', authMiddleware, deleteTodos)

export const todosRoute = route