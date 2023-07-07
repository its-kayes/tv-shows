import { Router } from "express";
import { showControllers } from "./show.controller";

const router: Router = Router();

router.post("/create-show", showControllers.createShow);

export { router as showRoutes}