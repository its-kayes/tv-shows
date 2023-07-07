import { Router } from "express";
import { showControllers } from "./show.controller";
import { isVerified } from "../../middlewares/isVerified";
import { Roles } from "../users/user.interface";

const router: Router = Router();

router.post("/create-show", isVerified(Roles.ADMIN), showControllers.createShow);
router.get("/get-show", showControllers.getShow);

export { router as showRoutes }