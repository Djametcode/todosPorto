import { Types } from "mongoose";

export interface ITodos {
    _id?: Types.ObjectId,
    title: string,
    todos: string,
    isCompleted: boolean,
    createdBy: Types.ObjectId,
    createdDate: Date
}

export interface IUser {
    _id?: Types.ObjectId,
    email: string,
    username: string,
    password: string,
    avatar?: string,
    todos: [{
        todoId: Types.ObjectId
    }]
}