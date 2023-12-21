"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.todosModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
const todosSchema = new Schema({
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
});
exports.todosModel = mongoose_1.default.model('Todos', todosSchema);
