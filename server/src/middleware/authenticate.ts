import { Request, Response, NextFunction } from 'express';
import passport from 'passport';
import createHttpError from 'http-errors';

const authenticate = () => {
  return (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate(
      'jwt',
      { session: false },
      (
        err: unknown,
        user: Express.User,
        info: { message?: string } | undefined
      ) => {
        if (err)
          return next(createHttpError(500, 'Passport authentication error'));
        if (!user)
          return next(createHttpError(401, info?.message || 'Unauthorized'));
        req.user = user;
        next();
      }
    )(req, res, next);
  };
};

export default authenticate;
