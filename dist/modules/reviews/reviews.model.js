"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Review = void 0;
const mongoose_1 = require("mongoose");
const reviewSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "User is required"]
    },
    rating: {
        type: Number,
        required: [true, "Rating is required"],
        min: [1, "Rating must be between 1 and 5"],
        max: [5, "Rating must be between 1 and 5"]
    },
    reviewContent: {
        type: String,
        required: [true, "Review content is required"]
    },
    show: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Show",
        required: [true, "Movie title is required"]
    }
}, {
    timestamps: true
});
exports.Review = (0, mongoose_1.model)("Review", reviewSchema);
