import { NextFunction, Request, Response } from "express";
import catchAsync from "../../util/catchAsync";
import { reviewService } from "./review.service";
import AppError from "../../util/AppError";
import { Review } from "./reviews.model";
// Implement post review
const postReview = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { reviewContent, rating } = req.body;
    if (!reviewContent || !rating) {
        return next(new AppError("Review content and rating are required", 400));
    }

    const result = await reviewService.postReview(req.body);

    if (!result) {
        return next(new AppError("Unable to post review", 400));
    }

    res.status(201).json({
        status: "success",
        review: result

    })

});

// Implement get reviews by Aggregation
const getReviews = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const reviews = await Review.aggregate([
        {
          $lookup: {
            from: "users", 
            localField: "user",
            foreignField: "_id",
            as: "user"
          }
        },
        {
          $unwind: "$user"
        },
        {
          $lookup: {
            from: "shows",
            localField: "show",
            foreignField: "_id",
            as: "show"
          }
        },
        {
          $unwind: "$show"
        },
        {
            $sort: {
              createdAt: 1
            }
        },
      ]);

      
    res.status(200).json({
        status: "success",
        reviews
    })
});

export const reviewController = {
    postReview,
    getReviews
}