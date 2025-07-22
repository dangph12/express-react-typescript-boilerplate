import express, { Router } from 'express';
import asyncHandler from '~/utils/async-handler';
import UserController from './user-controller';
import validate from '~/middleware/validate';
import UserValidationSchema from './user-validation';

const router: Router = express.Router();

// In list method, you can implement pagination, sorting, and filtering logic
router.get('/', asyncHandler(UserController.find));

// router.post(
//   '/',
//   validate(userValidationSchema.shape),
//   asyncHandler(UserController.create)
// );

// router.get('/:id', asyncHandler(UserController.findById));

// // For update, because some fields are optional, we use partial validation
// router.patch(
//   '/:id',
//   validate(userValidationSchema.partial().shape),
//   asyncHandler(UserController.update)
// );

// router.delete('/:id', asyncHandler(UserController.remove));

export default router;
