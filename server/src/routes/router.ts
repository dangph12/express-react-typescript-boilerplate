import { Router } from 'express';
import authRoutes from '~/modules/auth/auth-route';
import userRoute from '~/modules/user/user-route';
import { authorize } from '~/middleware/authorize';
import jwtAuth from '~/middleware/jwt-auth';

const router = Router();
// Non-auth routes
router.use('/auth', authRoutes);

// Auth routes
router.use('/users', jwtAuth, authorize(['admin']), userRoute);

export default router;
