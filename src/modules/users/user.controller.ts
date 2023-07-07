import { NextFunction, Request, Response } from "express";
import catchAsync from "../../util/catchAsync";
import { userService } from "./user.service";
import AppError from "../../util/AppError";
import bcrypt from "bcryptjs";
import { JWT_ACCESS_TOKEN_EXPIRES_IN, JWT_REFRESH_TOKEN_EXPIRES_IN, NODE_ENV } from "../../config/siteEnv";
import { jwtHelpers } from "../../helpers/jwtHelpers";

const userRegister = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
        return next(new AppError('Please provide name, email and password', 400));

    }

    const hashPassword = await bcrypt.hash(password, 10);

    const user = await userService.userRegister({ name, email, password: hashPassword, role });

    res.status(201).json({
        success: true,
        message: 'User created successfully',
        data: user
    });

});

const userLogin = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    if (!email || !password) {
        next(new AppError('Please provide email and password', 400));

    }

    const user = await userService.userVerify(email, password);

    if (!user) {
        return next(new AppError('Invalid email or password', 401));
    }

    const payload = {
        _id: user._id,
        role: user.role as string
    };

    const options = {
        expiresIn: JWT_ACCESS_TOKEN_EXPIRES_IN as string
    };

    const refreshOptions = {
        expiresIn: JWT_REFRESH_TOKEN_EXPIRES_IN as string
    };

    const accessToken = await jwtHelpers.createToken(payload, options);
    const refreshToken = await jwtHelpers.createToken(payload, refreshOptions);

    // ====================== Set Token On Cookie ======================

    const cookieOptions = {
        expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        httpOnly: true,
        secure: NODE_ENV === 'production'
    };

    res.cookie('refreshToken', refreshToken, cookieOptions);

    res.status(200).json({
        success: true,
        message: 'User logged in successfully',
        accessToken
    });
})

export const userController = {
    userRegister,
    userLogin
};