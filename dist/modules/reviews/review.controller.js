"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviewController = void 0;
const catchAsync_1 = __importDefault(require("../../util/catchAsync"));
const review_service_1 = require("./review.service");
const AppError_1 = __importDefault(require("../../util/AppError"));
const reviews_model_1 = require("./reviews.model");
// Implement post review
const postReview = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { reviewContent, rating } = req.body;
    if (!reviewContent || !rating) {
        return next(new AppError_1.default("Review content and rating are required", 400));
    }
    const result = yield review_service_1.reviewService.postReview(req.body);
    if (!result) {
        return next(new AppError_1.default("Unable to post review", 400));
    }
    res.status(201).json({
        status: "success",
        review: result
    });
}));
// Implement get reviews by Aggregation
const getReviews = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const reviews = yield reviews_model_1.Review.aggregate([
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
    });
}));
exports.reviewController = {
    postReview,
    getReviews
};
