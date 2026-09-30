import { HttpError } from 'http-errors';

export const errorHandler = (error, req, res, next) => {
  const isHttpError = error instanceof HttpError;

  const status = isHttpError ? error.status : 500;
  const message = isHttpError ? error.message : 'Internal Server Error';

  res.status(status).json({
    message,
  });
};
