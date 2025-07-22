import express, { Router } from 'express';
import auth from './auth-controller';
import asyncHandler from '~/utils/async-handler';

const router: Router = express.Router();

router.post('/register', asyncHandler(auth.register));
router.post('/login', asyncHandler(auth.login));
router.post('/refresh-token', asyncHandler(auth.refreshToken));
router.post('/logout', asyncHandler(auth.logout));

export default router as Router;
