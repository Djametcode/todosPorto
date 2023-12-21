"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controller/userController");
const multer_1 = require("../middleware/multer");
const auth_1 = require("../middleware/auth");
const route = express_1.default.Router();
route.patch('/update-avatar', auth_1.authMiddleware, multer_1.upload.single('avatar'), userController_1.updateAvatar);
route.delete('/delete-account', auth_1.authMiddleware, userController_1.deleteAccount);
exports.userRoutes = route;
