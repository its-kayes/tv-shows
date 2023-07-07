import { NextFunction, Request, Response } from "express";
import catchAsync from "../../util/catchAsync";
import { Show } from "./show.model";
import { ShowQueryParams } from "./show.interface";
import { SortOrder } from "mongoose";
import { ShowService } from "./show.service";
import AppError from "../../util/AppError";

// Create a show [Only for admin]
const createShow = catchAsync(async (req: Request, res: Response) => {
    const show = await Show.create(req.body);

    res.status(200).json({
        status: "success",
        show
    });
});


// Get all shows with pagination and sorting
const getShow = catchAsync(async (req: Request, res: Response) => {

    const {
        limit = 10,
        page,
        sortBy,
        sortOrder,
    } = req.query as ShowQueryParams;

    const skip = (Number(page) - 1) * Number(limit) || 0;

    const sortConditions: { [key: string]: SortOrder } = {};
    if (sortBy && sortOrder) {
        sortConditions[sortBy] = sortOrder === 'asc' ? 1 : -1;
    }

    const result = await ShowService.getShow(
        Number(limit),
        skip,
        sortConditions
    );

    res.status(200).json({
        status: "success",
        result
    });
});

// Get show by title
const getShowByTitle = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { title }: { title?: string } = req.query;

    if(!title) {
        next(new AppError("Please provide a title", 400));
    }

    const show  = await Show.findOne({ title });

    res.status(200).json({
        status: "success",
        show
    });
});

export const showControllers = {
    createShow,
    getShow,
    getShowByTitle
}