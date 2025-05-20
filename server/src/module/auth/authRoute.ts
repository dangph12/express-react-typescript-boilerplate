import express, { Router, Request, Response, NextFunction } from 'express';
import auth from './authController';

const router: Router = express.Router();

// Middleware to handle async controllers
const asyncHandler =
  (
    fn: (
      req: Request,
      res: Response,
      next: NextFunction
    ) => Promise<Response> | Response
  ) =>
  (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };

router.post('/register', asyncHandler(auth.register));
router.post('/login', asyncHandler(auth.login));
router.post('/refresh-token', asyncHandler(auth.refreshToken));
router.post('/logout', asyncHandler(auth.logout));

export default router as Router;
