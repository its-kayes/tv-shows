"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviewRoutes = void 0;
const express_1 = require("express");
const review_controller_1 = require("./review.controller");
const isVerified_1 = require("../../middlewares/isVerified");
const user_interface_1 = require("../users/user.interface");
const router = (0, express_1.Router)();
exports.reviewRoutes = router;
router.post("/post-review", (0, isVerified_1.isVerified)(user_interface_1.Roles.USER), review_controller_1.reviewController.postReview);
router.get("/get-reviews", review_controller_1.reviewController.getReviews);