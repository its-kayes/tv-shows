import { Router } from "express";
import { showControllers } from "./show.controller";
import { isVerified } from "../../middlewares/isVerified";
import { Roles } from "../users/user.interface";

const router: Router = Router();

router.get("/get-show", showControllers.getShow);
router.get("/show-by-title", showControllers.getShowByTitle);
router.post("/create-show", isVerified(Roles.ADMIN), showControllers.createShow);

export { router as showRoutes }