import { Schema, model } from "mongoose";
import { IShow } from "./show.interface";

const showSchema = new Schema<IShow>({
    runtime: {
        type: String,
        required: [true, 'Runtime is required']
    },
    actors: {
        type: [String],
        required: [true, 'Actors is required']
    },
    director: {
        type: String,
        required: [true, 'Director is required']
    },
    producer: {
        type: String,
        required: [true, 'Producer is required']
    },
    releaseDate: {
        type: String,
        required: [true, 'Release date is required']
    },
    posterImage: {
        type: String,
        required: [true, 'Poster image is required']
    },
    title: {
        type: String,
        required: [true, 'Title is required'],
        unique: true
    }
}, {
    timestamps: true
})

export const Show = model<IShow>('Show', showSchema);