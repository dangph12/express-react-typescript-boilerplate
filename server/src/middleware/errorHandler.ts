import { Request, Response, ErrorRequestHandler } from 'express';
import { apiResponse } from '~/types/apiResponse';
import isHttpError from 'http-errors';

export const errorHandler: ErrorRequestHandler = (
  err: isHttpError.HttpError | Error,
  req: Request,
  res: Response
): void => {
  const status = isHttpError.isHttpError(err) ? err.status : 500;

  if (status >= 400 && status < 500) {
    const message = err.message || 'Client Error';
    res.status(status).json(apiResponse.failed(message));
    return;
  }

  const message =
    process.env.NODE_ENV === 'production' && err instanceof Error
      ? 'Internal Server Error'
      : err.message;

  res.status(500).json(apiResponse.error(message));
};
