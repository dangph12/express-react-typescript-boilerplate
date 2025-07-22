import { z, ZodType } from 'zod';
import { Request, Response, NextFunction } from 'express';
import createHttpError from 'http-errors';

/**
 * Generic middleware to validate request body fields using Zod.
 * @param fields - An object mapping field names to Zod schemas.
 */
const validate = (fields: Record<string, ZodType<any>>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const schema = z.object(fields);
    const result = schema.safeParse(req.body);
    if (!result.success) {
      throw createHttpError(400, `Validation error: ${result.error.message}`);
    }
    next();
  };
};

export default validate;
