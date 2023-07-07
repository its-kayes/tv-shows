import { Router } from "express";
import { reviewController } from "./review.controller";
import { isVerified } from "../../middlewares/isVerified";
import { Roles } from "../users/user.interface";

const router  = Router();

router.post("/post-review", isVerified(Roles.USER),reviewController.postReview);
router.get("/get-reviews", reviewController.getReviews)

export { router as reviewRoutes}