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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const catchAsync_1 = __importDefault(require("../../util/catchAsync"));
const user_service_1 = require("./user.service");
const AppError_1 = __importDefault(require("../../util/AppError"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const siteEnv_1 = require("../../config/siteEnv");
const jwtHelpers_1 = require("../../helpers/jwtHelpers");
const userRegister = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password) {
        return next(new AppError_1.default('Please provide name, email and password', 400));
    }
    const hashPassword = yield bcryptjs_1.default.hash(password, 10);
    const user = yield user_service_1.userService.userRegister({ name, email, password: hashPassword, role });
    res.status(201).json({
        success: true,
        message: 'User created successfully',
        data: user
    });
}));
const userLogin = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email || !password) {
        next(new AppError_1.default('Please provide email and password', 400));
    }
    const user = yield user_service_1.userService.userVerify(email, password);
    if (!user) {
        return next(new AppError_1.default('Invalid email or password', 401));
    }
    const payload = {
        _id: user._id,
        role: user.role
    };
    const options = {
        expiresIn: siteEnv_1.JWT_ACCESS_TOKEN_EXPIRES_IN
    };
    const refreshOptions = {
        expiresIn: siteEnv_1.JWT_REFRESH_TOKEN_EXPIRES_IN
    };
    const accessToken = yield jwtHelpers_1.jwtHelpers.createToken(payload, options);
    const refreshToken = yield jwtHelpers_1.jwtHelpers.createToken(payload, refreshOptions);
    // ====================== Set Token On Cookie ======================
    const cookieOptions = {
        expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        httpOnly: true,
        secure: siteEnv_1.NODE_ENV === 'production'
    };
    res.cookie('refreshToken', refreshToken, cookieOptions);
    res.status(200).json({
        success: true,
        message: 'User logged in successfully',
        accessToken
    });
}));
exports.userController = {
    userRegister,
    userLogin
};
