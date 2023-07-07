import { NextFunction, Request, Response } from "express";
import catchAsync from "../../util/catchAsync";
import { userService } from "./user.service";
import AppError from "../../util/AppError";
import bcrypt from "bcryptjs";

const userRegister = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { name, email, password } = req.body;

    if(!name || !email || !password) {
        return next(new AppError('Please provide name, email and password', 400));
        
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const user = await userService.userRegister({ name, email, password: hashPassword });

    res.status(201).json({
        success: true,
        message: 'User created successfully',
        data: user
    });

});

const userLogin = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    if(!email || !password) {
        next(new AppError('Please provide email and password', 400));
        
    }

    const user = await userService.userVerify(email, password);

    if(!user) {
        return next(new AppError('Invalid email or password', 401));
    }

    res.status(200).json({
        success: true,
        message: 'User logged in successfully',
        data: user
    });
})

export const userController = {
    userRegister,
    userLogin
};