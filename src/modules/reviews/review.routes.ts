import { Router } from "express";
import { reviewController } from "./review.controller";

const router  = Router();

router.post("/post-review", reviewController.postReview);

export { router as reviewRoutes}