import { ObjectId } from "mongodb";
import { Model } from "mongoose";

export interface IUser {
    _id?: ObjectId;
    name: string;
    email: string;
    password: string;
    createdAt?: Date;
    updatedAt?: Date;
    role?: 'user' | 'admin';
}

export const Roles = {
    ADMIN: 'admin',
    USER: 'user'
};
  

export type UserModel = Model<IUser, Record<string, unknown>>;