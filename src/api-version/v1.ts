import { Router } from "express";

const router: Router = Router();

router.get('/', (req, res) => {
    res.status(200).json({
        message: 'Welcome to the Tv Shows API'
    });
    }
);

export { router as v1 }
