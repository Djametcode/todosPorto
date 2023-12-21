"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.todosRoute = void 0;
const express_1 = __importDefault(require("express"));
const todosController_1 = require("../controller/todosController");
const auth_1 = require("../middleware/auth");
const route = express_1.default.Router();
route.post('/create-todos', auth_1.authMiddleware, todosController_1.createTodos);
route.patch('/update-todos/:id', auth_1.authMiddleware, todosController_1.updateTodos);
route.delete('/delete-todos/:id', auth_1.authMiddleware, todosController_1.deleteTodos);
exports.todosRoute = route;
