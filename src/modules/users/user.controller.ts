import { NextFunction, Request, Response } from "express";
import catchAsync from "../../util/catchAsync";
import { userService } from "./user.service";
import AppError from "../../util/AppError";
import bcrypt from "bcryptjs";

const userRegister = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { name, email, password } = req.body;

    if(!name || !email || !password) {
        next(new AppError('Please provide name, email and password', 400));
        
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const user = await userService.userRegister({ name, email, password: hashPassword });

    res.status(201).json({
        success: true,
        message: 'User created successfully',
        data: user
    });

});

export const userController = {
    userRegister
};