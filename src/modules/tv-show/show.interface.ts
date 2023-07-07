import { ObjectId } from "mongodb";
import { Model } from "mongoose";

export interface IShow {
    _id?: ObjectId;
    runtime: string,
    actors: string[],
    director: string,
    producer: string,
    releaseDate: string,
    posterImage: string,
    title: string,
    createdAt?: Date,
    updatedAt?: Date
}

export type ShowModel = Model<IShow, Record<string, unknown>>;