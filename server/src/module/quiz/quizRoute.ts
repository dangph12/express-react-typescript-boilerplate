import express, { Router, Request, Response, NextFunction } from 'express';
import quizController from './quizController';

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

/*
 * GET
 */
router.get('/', asyncHandler(quizController.list));

/*
 * GET
 */
router.get('/:id', asyncHandler(quizController.show));

/*
 * POST
 */
router.post('/', asyncHandler(quizController.create));

/*
 * PUT
 */
router.put('/:id', asyncHandler(quizController.update));

/*
 * DELETE
 */
router.delete('/:id', asyncHandler(quizController.remove));

export default router as Router;
