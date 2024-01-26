"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cancleFinishTodo = exports.finishTodo = exports.deleteTodos = exports.updateTodos = exports.createTodos = void 0;
const userModel_1 = require("../model/userModel");
const todosModel_1 = require("../model/todosModel");
const createTodos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user.userId;
    const { title, todos } = req.body;
    if (!title) {
        return res.status(400).json({ msg: "Please fill title" });
    }
    const titleTodos = title.trim();
    if (!todos) {
        return res.status(400).json({ msg: "Please fill todos" });
    }
    const todosBody = todos.trim();
    try {
        const user = yield userModel_1.userModel.findOne({ _id: userId });
        if (!user) {
            return res.status(401).json({ msg: "Token invalid" });
        }
        const newTodos = new todosModel_1.todosModel({
            title: titleTodos,
            todos: todosBody,
            createdBy: user._id
        });
        const todos = yield todosModel_1.todosModel.create(newTodos);
        user.todos.push({ todoId: todos._id });
        yield user.save();
        return res.status(200).json({ msg: 'success', todos });
    }
    catch (error) {
        return res.status(501).json({ msg: "Internal Server Error" });
    }
});
exports.createTodos = createTodos;
const updateTodos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const userId = req.user.userId;
    const { title, todos, isCompleted } = req.body;
    if (!title || !todos || !isCompleted) {
        return res.status(400).json({ msg: "Please fill requipment" });
    }
    const titleTodos = todos.trim();
    const todosBody = todos.trim();
    try {
        const user = yield userModel_1.userModel.findOne({ _id: userId });
        const todos = yield todosModel_1.todosModel.findOne({ _id: id });
        if ((todos === null || todos === void 0 ? void 0 : todos.createdBy.toString()) !== userId) {
            return res.status(401).json({ msg: "Please login with correct account" });
        }
        const updateTodos = yield todosModel_1.todosModel.findOneAndUpdate({ _id: id }, { title: titleTodos, todos: todosBody, isCompleted: isCompleted });
        return res.status(200).json({ msg: "Success", updateTodos });
    }
    catch (error) {
        return res.status(501).json({ msg: "Internal Server Error" });
    }
});
exports.updateTodos = updateTodos;
const deleteTodos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const userId = req.user.userId;
    try {
        const user = yield userModel_1.userModel.findOne({ _id: userId });
        if (!user) {
            return res.status(401).json({ msg: "Token Invalid" });
        }
        const todos = yield todosModel_1.todosModel.findOne({ _id: id });
        if (!todos) {
            return res.status(404).json({ msg: "Todos not found" });
        }
        if (todos.createdBy !== user._id) {
            return res.status(401).json({ msg: "Please login with correct account" });
        }
        const selectedTodos = yield todosModel_1.todosModel.findOneAndDelete({ _id: todos._id });
        return res.status(200).json({ msg: "success", selectedTodos });
    }
    catch (error) {
        return res.status(501).json({ msg: "Internal Server Error" });
    }
});
exports.deleteTodos = deleteTodos;
const finishTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const userId = req.user.userId;
    try {
        const user = yield userModel_1.userModel.findOne({ _id: userId });
        if (!user) {
            return res.status(401).json({ msg: "Token Invalid" });
        }
        const todos = yield todosModel_1.todosModel.findOne({ _id: id });
        if (!todos) {
            return res.status(404).json({ msg: "Todos not found" });
        }
        if (todos.createdBy.toString() !== user._id.toString()) {
            return res.status(401).json({ msg: "Please login with correct account" });
        }
        const finishedTodos = yield todosModel_1.todosModel.findOneAndUpdate({ _id: id }, { isCompleted: true }, { new: true });
        return res.status(200).json({ msg: "success", finishedTodos });
    }
    catch (error) {
        return res.status(501).json({ msg: "Internal Server Error" });
    }
});
exports.finishTodo = finishTodo;
const cancleFinishTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const userId = req.user.userId;
    try {
        const user = yield userModel_1.userModel.findOne({ _id: userId });
        if (!user) {
            return res.status(401).json({ msg: "Token Invalid" });
        }
        const todos = yield todosModel_1.todosModel.findOne({ _id: id });
        if (!todos) {
            return res.status(404).json({ msg: "Todos not found" });
        }
        if (todos.createdBy.toString() !== userId) {
            return res.status(401).json({ msg: "Please login with correct account" });
        }
        const finishedTodos = yield todosModel_1.todosModel.findOneAndUpdate({ _id: id }, { isCompleted: false }, { new: true });
        return res.status(200).json({ msg: "success", finishedTodos });
    }
    catch (error) {
        return res.status(501).json({ msg: "Internal Server Error" });
    }
});
exports.cancleFinishTodo = cancleFinishTodo;
