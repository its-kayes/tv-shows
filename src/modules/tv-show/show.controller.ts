import { Request, Response } from "express";
import catchAsync from "../../util/catchAsync";
import { Show } from "./show.model";
import { ShowQueryParams } from "./show.interface";
import { SortOrder } from "mongoose";
import { ShowService } from "./show.service";

const createShow = catchAsync(async (req: Request, res: Response) => {
    const show = await Show.create(req.body);

    res.status(200).json({
        status: "success",
        show
    });
});

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

export const showControllers = {
    createShow,
    getShow
}