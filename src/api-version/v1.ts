import { Router } from "express";
import { userRoutes } from "../modules/users/user.routes";
import { showRoutes } from "../modules/tv-show/show.routes";
import { reviewRoutes } from "../modules/reviews/review.routes";

const router: Router = Router();

router.get('/', (req, res) => {
    res.status(200).json({
        message: 'Welcome to the Tv Shows API'
    });
    }
);

router.use('/users',userRoutes);
router.use('/shows', showRoutes);
router.use('/reviews', reviewRoutes);

export { router as v1 }
