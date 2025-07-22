import { Router } from 'express';
import AuthRoutes from '~/modules/auth/auth-route';
import UserRoute from '~/modules/user/user-route';
import authorize from '~/middleware/authorize';

const router = Router();
// Non-auth routes
router.use('/auth', AuthRoutes);

// Auth routes
router.use('/users', UserRoute);

export default router;
