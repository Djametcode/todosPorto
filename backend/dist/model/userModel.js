"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
const userSchema = new Schema({
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
});
exports.userModel = mongoose_1.default.model('User', userSchema);
