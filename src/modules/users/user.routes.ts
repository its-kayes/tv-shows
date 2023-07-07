import { Router } from 'express';
import { userController } from './user.controller';
const router: Router = Router();

router.post('/register', userController.userRegister);
router.post('/login', userController.userLogin);

export { router as userRoutes}