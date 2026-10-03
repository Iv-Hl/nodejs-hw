import { HttpError } from 'http-errors';
import { MulterError } from 'multer';

export const errorHandler = (error, req, res, next) => {
  const isHttpError = error instanceof HttpError;
  const isUploadError =
    error instanceof MulterError || error.message === 'Only images allowed';

  const status = isHttpError ? error.status : isUploadError ? 400 : 500;
  const message =
    isHttpError || isUploadError ? error.message : 'Internal Server Error';

  res.status(status).json({
    message,
  });
};
