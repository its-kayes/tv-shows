"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Show = void 0;
const mongoose_1 = require("mongoose");
const showSchema = new mongoose_1.Schema({
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
});
exports.Show = (0, mongoose_1.model)('Show', showSchema);
