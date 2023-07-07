"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.v1 = void 0;
const express_1 = require("express");
const user_routes_1 = require("../modules/users/user.routes");
const show_routes_1 = require("../modules/tv-show/show.routes");
const review_routes_1 = require("../modules/reviews/review.routes");
const router = (0, express_1.Router)();
exports.v1 = router;
router.get('/', (req, res) => {
    res.status(200).json({
        message: 'Welcome to the Tv Shows API'
    });
});
router.use('/users', user_routes_1.userRoutes);
router.use('/shows', show_routes_1.showRoutes);
router.use('/reviews', review_routes_1.reviewRoutes);
