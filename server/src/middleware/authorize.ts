import { Request, Response, NextFunction } from 'express';
import createHttpError from 'http-errors';
import { IUser } from '~/modules/user/user-type';

const authorize =
  (allowedRoles: string[]) =>
  (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      throw createHttpError(401, 'Unauthenticated');
    }

    const user = req.user as IUser;

    if (!allowedRoles.includes(user.role)) {
      throw createHttpError(403, 'Forbidden');
    }

    next();
  };

export default authorize;
