import { Router } from "express";
import { reviewController } from "./review.controller";
import { isVerified } from "../../middlewares/isVerified";
import { Roles } from "../users/user.interface";

const router  = Router();

router.post("/post-review", isVerified(Roles.USER),reviewController.postReview);

export { router as reviewRoutes}