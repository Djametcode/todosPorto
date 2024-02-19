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
exports.getMyTodos = exports.getCurrentUser = exports.deleteAccount = exports.updateAvatar = exports.loginUser = exports.registerUser = void 0;
const hashPassword_1 = require("../helper/hashPassword");
const userModel_1 = require("../model/userModel");
const passwordChecker_1 = require("../helper/passwordChecker");
const jwtGenerator_1 = require("../helper/jwtGenerator");
const cloudinary_1 = require("cloudinary");
const todosModel_1 = require("../model/todosModel");
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password } = req.body;
    if (!username || !email) {
        return res.status(401).json({ msg: 'Please provide requipment' });
    }
    try {
        const isExist = yield userModel_1.userModel.findOne({ email: email });
        if (isExist) {
            return res.status(401).json({ msg: "Email already registered" });
        }
        if (!password) {
            return res.status(400).json({ msg: 'please provide password' });
        }
        const securePass = yield (0, hashPassword_1.hashPassword)(password);
        const newUser = new userModel_1.userModel({
            username: username,
            email: email,
            password: securePass
        });
        const user = yield userModel_1.userModel.create(newUser);
        return res.status(200).json({ msg: 'success', user });
    }
    catch (error) {
        return res.status(501).json({ msg: "Internal server error" });
    }
});
exports.registerUser = registerUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(401).json({ msg: 'Please fill requipment' });
    }
    try {
        const user = yield userModel_1.userModel.findOne({ email: email });
        if (!user) {
            return res.status(404).json({ msg: "Email not registered yet" });
        }
        const isMatch = yield (0, passwordChecker_1.passwordChecker)(password, user.password);
        console.log(isMatch);
        if (!isMatch) {
            return res.status(401).json({ msg: "Password wrong" });
        }
        const token = (0, jwtGenerator_1.jwtGenerator)({ _id: user._id, username: user.username, email: user.email });
        return res.status(200).json({ msg: 'Success login', user, token });
    }
    catch (error) {
        return res.status(501).json({ msg: "Internal server error" });
    }
});
exports.loginUser = loginUser;
const updateAvatar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user.userId;
    let file = req.file;
    try {
        const user = yield userModel_1.userModel.findOne({ _id: userId });
        console.log(user);
        if (!user) {
            return res.status(401).json({ msg: 'Token invalid' });
        }
        if (!file) {
            return res.status(400).json({ msg: 'Please attach file' });
        }
        const result = yield cloudinary_1.v2.uploader.upload(file.path, {
            resource_type: 'auto',
            folder: 'Testing'
        });
        const updatedUser = yield userModel_1.userModel.findOneAndUpdate({ _id: userId }, { avatar: result.secure_url }, { new: true });
        return res.status(200).json({ msg: 'Success', updatedUser });
    }
    catch (error) {
        console.log(error);
        return res.status(501).json({ msg: 'Internal Server Error' });
    }
});
exports.updateAvatar = updateAvatar;
const deleteAccount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user.userId;
    const { id } = req.params;
    if (userId !== id) {
        return res.status(401).json({ msg: 'Please login with correct account' });
    }
    try {
        const user = yield userModel_1.userModel.findOne({ _id: userId });
        if (!user) {
            return res.status(401).json({ msg: "Token invalid" });
        }
        const todos = yield todosModel_1.todosModel.deleteMany({ createdBy: userId });
        const userDelete = yield userModel_1.userModel.findOneAndDelete({ _id: userId });
        return res.status(200).json({ msg: "Account deleted", userDelete, todos });
    }
    catch (error) {
        return res.status(501).json({ msg: "Internal server error" });
    }
});
exports.deleteAccount = deleteAccount;
const getCurrentUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user.userId;
    try {
        const user = yield userModel_1.userModel.findOne({ _id: userId }).select(["username", "email", "avatar", "todos"]);
        if (!user) {
            return res.status(401).json({ msg: "Token invalid" });
        }
        return res.status(200).json({ msg: "success", user });
    }
    catch (error) {
        return res.status(501).json({ msg: "Internal server error" });
    }
});
exports.getCurrentUser = getCurrentUser;
const getMyTodos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user.userId;
    try {
        const user = yield userModel_1.userModel.findOne({ _id: userId }).select(["username", "email", "avatar", "todos"]);
        if (!user) {
            return res.status(401).json({ msg: "Token invalid" });
        }
        const todos = yield todosModel_1.todosModel.find({ createdBy: user._id });
        return res.status(200).json({ msg: "success", todos });
    }
    catch (error) {
        return res.status(501).json({ msg: "Internal server error" });
    }
});
exports.getMyTodos = getMyTodos;
