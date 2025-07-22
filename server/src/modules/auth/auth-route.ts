import express, { Router } from 'express';
import asyncHandler from '~/utils/async-handler';
import AuthController from './auth-controller';
import validate from '~/middleware/validate';
import passport from 'passport';
import { LocalLogin, LocalRegister } from './auth-validation';

const router: Router = express.Router();

router.post(
  '/register',
  validate(LocalRegister.shape),
  asyncHandler(AuthController.register)
);
router.post(
  '/login',
  validate(LocalLogin.shape),
  asyncHandler(AuthController.login)
);
router.post('/refresh-token', asyncHandler(AuthController.refreshToken));
router.post('/logout', asyncHandler(AuthController.logout));

router.get(
  '/google',
  passport.authenticate('google', { scope: ['email', 'profile'] })
);
router.get(
  '/google/callback',
  passport.authenticate('google', {
    session: false,
    failureRedirect: '/login'
  }),
  asyncHandler(AuthController.loginByGoogle)
);

export default router;
