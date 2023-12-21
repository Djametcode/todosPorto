import { Request, Response } from "express";
import { userModel } from "../model/userModel";
import { todosModel } from "../model/todosModel";

export const createTodos = async (req: Request, res: Response) => {
    const userId = req.user.userId
    const { title, todos } = req.body

    if (!title) {
        return res.status(400).json({ msg: "Please fill title" })
    }

    const titleTodos = title.trim()

    if (!todos) {
        return res.status(400).json({ msg: "Please fill todos" })
    }

    const todosBody = todos.trim()

    try {
        const user = await userModel.findOne({ _id: userId })

        if (!user) {
            return res.status(401).json({ msg: "Token invalid" })
        }

        const newTodos = new todosModel({
            title: titleTodos,
            todos: todosBody,
            createdBy: user._id
        })

        const todos = await todosModel.create(newTodos)

        return res.status(200).json({ msg: 'success', todos })

    } catch (error) {
        return res.status(501).json({ msg: "Internal Server Error" })
    }
}

export const updateTodos = async (req: Request, res: Response) => {
    const { id } = req.params
    const userId = req.user.userId
    const { title, todos, isCompleted } = req.body

    if (!title || !todos || !isCompleted) {
        return res.status(400).json({ msg: "Please fill requipment" })
    }

    const titleTodos = todos.trim()
    const todosBody = todos.trim()

    try {
        const user = await userModel.findOne({ _id: userId })
        const todos = await todosModel.findOne({ _id: id })

        if (todos?.createdBy !== user?._id) {
            return res.status(401).json({ msg: "Please login with correct account" })
        }

        const updateTodos = await todosModel.findOneAndUpdate({ _id: id }, { title: titleTodos, todos: todosBody, isCompleted: isCompleted });

        return res.status(200).json({ msg: "Success", updateTodos })
    } catch (error) {
        return res.status(501).json({ msg: "Internal Server Error" })
    }
}

export const deleteTodos = async (req: Request, res: Response) => {
    const { id } = req.params
    const userId = req.user.userId

    try {
        const user = await userModel.findOne({ _id: userId })

        if (!user) {
            return res.status(401).json({ msg: "Token Invalid" })
        }

        const todos = await todosModel.findOne({ _id: id })

        if (!todos) {
            return res.status(404).json({ msg: "Todos not found" })
        }

        if (todos.createdBy !== user._id) {
            return res.status(401).json({ msg: "Please login with correct account" })
        }

        const selectedTodos = await todosModel.findOneAndDelete({ _id: todos._id })

        return res.status(200).json({ msg: "success", selectedTodos })
    } catch (error) {
        return res.status(501).json({ msg: "Internal Server Error" })
    }
}