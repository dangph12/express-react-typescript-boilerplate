import { Router } from 'express';
import authRoutes from '~/modules/auth/authRoute';
import userRoute from '~/modules/user/userRoute';
import { authorize } from '~/middleware/authorize';
import jwtAuth from '~/middleware/jwtAuth';

const router = Router();
// Non-auth routes
router.use('/auth', authRoutes);

// Auth routes

router.use('/users', jwtAuth, authorize('admin'), userRoute);

export default router;
