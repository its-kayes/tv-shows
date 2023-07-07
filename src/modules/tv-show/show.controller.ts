import { Request, Response } from "express";
import catchAsync from "../../util/catchAsync";
import { Show } from "./show.model";

const createShow = catchAsync(async (req: Request, res: Response) => {

    const show = await Show.create(req.body);

    res.status(200).json({
        status: "success",
        show
    });
});

export const showControllers = {
    createShow
}