import mongoose from "mongoose";
import { IUser } from "../libs/Types";
const { Schema } = mongoose

const userSchema = new Schema<IUser>({
    email: {
        type: String,
        required: [true, 'Please provide email']
    },
    username: {
        type: String,
        required: [true, 'Please provide username']
    },
    password: {
        type: String,
        required: [true, 'Please provide password']
    },
    avatar: {
        type: String,
        default: ''
    },
    todos: [{
        todoId: {
            type: Schema.ObjectId,
            ref: 'Todos'
        }
    }]
})

export const userModel = mongoose.model('User', userSchema)

