import { NextFunction, Request, Response } from "express";
import catchAsync from "../../util/catchAsync";
import { reviewService } from "./review.service";
import AppError from "../../util/AppError";

const postReview = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { reviewContent, rating } = req.body;
    if(!reviewContent || !rating) {
        return next(new AppError("Review content and rating are required", 400));
    }

    const result = await reviewService.postReview(req.body);

    if(!result) {
        return next(new AppError("Unable to post review", 400));
    }

    res.status(201).json({
        status: "success",
        review: result
        
    })

});

export const reviewController = {
    postReview
}