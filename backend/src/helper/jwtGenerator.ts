import { Types } from "mongoose"
import jwt from 'jsonwebtoken'

interface IData {
    _id: Types.ObjectId,
    username: string,
    email: string
}

export const jwtGenerator = (data: IData) => {
    return jwt.sign({
        userId: data._id,
        username: data.username,
        email: data.email
    }, process.env.JWT_SECRET, { expiresIn: '2d' })
}