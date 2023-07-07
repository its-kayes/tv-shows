import { ObjectId } from "mongodb";
import { Model } from "mongoose";

export interface IReview {
    _id?: ObjectId;
    user: ObjectId;
    show: ObjectId;
    rating: number;
    reviewContent: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export type MovieReview = Model<IReview, Record<string, unknown>>;