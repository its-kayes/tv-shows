import { ObjectId } from "mongodb";
import { Model } from "mongoose";

export interface IUser {
    _id?: ObjectId;
    name: string;
    email: string;
    password: string;
}

export type UserModel = Model<IUser, Record<string, unknown>>;