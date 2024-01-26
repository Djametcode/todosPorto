import express from 'express'
import { cancleFinishTodo, createTodos, deleteTodos, finishTodo, updateTodos } from '../controller/todosController'
import { authMiddleware } from '../middleware/auth'
const route = express.Router()

route.post('/create-todos', authMiddleware, createTodos)
route.patch('/update-todos/:id', authMiddleware, updateTodos)
route.delete('/delete-todos/:id', authMiddleware, deleteTodos)
route.put("/finish-todo/:id", authMiddleware, finishTodo)
route.put("/unfinish-todo/:id", authMiddleware, cancleFinishTodo)

export const todosRoute = route