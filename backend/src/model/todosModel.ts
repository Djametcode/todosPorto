import mongoose, { mongo } from "mongoose";
import { ITodos } from "../libs/Types";
const { Schema } = mongoose

const todosSchema = new Schema<ITodos>({
    title: {
        type: String,
        required: [true, 'Please provide title']
    },
    todos: {
        type: String,
        required: [true, 'Please provide todos']
    },
    createdBy: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    createdDate: {
        type: Date,
        default: Date.now()
    },
    isCompleted: {
        type: Boolean,
        default: false
    }
})

export const todosModel = mongoose.model('Todos', todosSchema)