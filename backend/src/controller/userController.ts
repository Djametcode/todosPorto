import { Request, Response } from "express"
import { hashPassword } from "../helper/hashPassword"
import { userModel } from "../model/userModel"
import { passwordChecker } from "../helper/passwordChecker"
import { jwtGenerator } from "../helper/jwtGenerator"
import { v2 as cloudinary } from 'cloudinary'
import { todosModel } from "../model/todosModel"

export const registerUser = async (req: Request, res: Response) => {
    const { username, email, password } = req.body

    if (!username || !email) {
        return res.status(401).json({ msg: 'Please provide requipment' })
    }

    try {
        const isExist = await userModel.findOne({ email: email })

        if (isExist) {
            return res.status(401).json({ msg: "Email already registered" })
        }

        if (!password) {
            return res.status(400).json({ msg: 'please provide password' })
        }

        const securePass = await hashPassword(password)

        const newUser = new userModel({
            username: username,
            email: email,
            password: securePass
        })

        const user = await userModel.create(newUser)

        return res.status(200).json({ msg: 'success', user })
    } catch (error) {
        return res.status(501).json({ msg: "Internal server error" })
    }
}

export const loginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body

    if (!email || !password) {
        return res.status(401).json({ msg: 'Please fill requipment' })
    }

    try {
        const user = await userModel.findOne({ email: email });

        if (!user) {
            return res.status(404).json({ msg: "Email not registered yet" })
        }

        const isMatch = await passwordChecker(password, user.password)
        console.log(isMatch)

        if (!isMatch) {
            return res.status(401).json({ msg: "Password wrong" })
        }

        const token = jwtGenerator({ _id: user._id, username: user.username, email: user.email })

        return res.status(200).json({ msg: 'Success login', user, token })
    } catch (error) {
        return res.status(501).json({ msg: "Internal server error" })
    }
}

export const updateAvatar = async (req: Request, res: Response) => {
    const userId = req.user.userId
    let file = req.file

    try {
        const user = await userModel.findOne({ _id: userId })
        console.log(user);

        if (!user) {
            return res.status(401).json({ msg: 'Token invalid' })
        }

        if (!file) {
            return res.status(400).json({ msg: 'Please attach file' })
        }

        const result = await cloudinary.uploader.upload(file.path, {
            resource_type: 'auto',
            folder: 'Testing'
        })

        const updatedUser = await userModel.findOneAndUpdate({ _id: userId }, { avatar: result.secure_url }, { new: true })

        return res.status(200).json({ msg: 'Success', updatedUser })


    } catch (error) {
        console.log(error)
        return res.status(501).json({ msg: 'Internal Server Error' })
    }
}

export const deleteAccount = async (req: Request, res: Response) => {
    const userId = req.user.userId
    const { id } = req.params

    if (userId !== id) {
        return res.status(401).json({ msg: 'Please login with correct account' })
    }

    try {
        const user = await userModel.findOne({ _id: userId })

        if (!user) {
            return res.status(401).json({ msg: "Token invalid" })
        }

        const todos = await todosModel.deleteMany({ createdBy: userId })
        const userDelete = await userModel.findOneAndDelete({ _id: userId })

        return res.status(200).json({ msg: "Account deleted", userDelete, todos })

    } catch (error) {
        return res.status(501).json({ msg: "Internal server error" })
    }
}

export const getCurrentUser = async (req: Request, res: Response) => {
    const userId = req.user.userId

    try {
        const user = await userModel.findOne({ _id: userId }).select(["username", "email", "avatar", "todos"])

        if (!user) {
            return res.status(401).json({ msg: "Token invalid" })
        }

        return res.status(200).json({ msg: "success", user })
    } catch (error) {
        return res.status(501).json({ msg: "Internal server error" })
    }
}

export const getMyTodos = async (req: Request, res: Response) => {
    const userId = req.user.userId

    try {
        const user = await userModel.findOne({ _id: userId }).select(["username", "email", "avatar", "todos"])

        if (!user) {
            return res.status(401).json({ msg: "Token invalid" })
        }

        const todos = await todosModel.find({ createdBy: user._id })

        return res.status(200).json({ msg: "success", todos })

    } catch (error) {
        return res.status(501).json({ msg: "Internal server error" })
    }
}