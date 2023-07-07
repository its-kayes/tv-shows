import { Schema, model } from "mongoose";

const reviewSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
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
        type: Schema.Types.ObjectId,
        ref: "Show",
        required: [true, "Movie title is required"]
    }
}, {
    timestamps: true
})

export const Review = model("Review", reviewSchema);