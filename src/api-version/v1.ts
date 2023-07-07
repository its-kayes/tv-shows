import { Router } from "express";
import { userRoutes } from "../modules/users/user.routes";

const router: Router = Router();

router.get('/', (req, res) => {
    res.status(200).json({
        message: 'Welcome to the Tv Shows API'
    });
    }
);

router.use('/users',userRoutes);

export { router as v1 }
