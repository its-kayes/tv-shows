import { Schema, model } from "mongoose";
import { IUser, UserModel } from "./user.interface";

const userSchema = new Schema<IUser>({
    name: {
        type: String,
        required: [true, 'Name is required !'],
        maxlength: [50, 'Name must be less than 50 characters !']
    },
    email: {
        type: String,
        required: [true, 'Email is required !'],
        unique: true,
        maxlength: [50, 'Email must be less than 50 characters !']
    },
    password: {
        type: String,
        required: [true, 'Password is required !!'],
        minlength: [3, 'Password must be greater than 3 characters !'],
    }
}, {timestamps: true});

export const User = model<IUser, UserModel>('User', userSchema);
