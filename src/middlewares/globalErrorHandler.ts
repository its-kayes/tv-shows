import { ErrorRequestHandler } from 'express';
import { NODE_ENV } from '../config/siteEnv';
import AppError from '../util/AppError';

export type IGenericErrorMessage = {
  path: string | number;
  message: string;
};

const globalErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
  let statusCode = 500;
  let message = 'Something went wrong !';
  let errorMessages: IGenericErrorMessage[] = [];

  if (error instanceof AppError){
    statusCode = error?.statusCode;
    message = error.message;
    errorMessages = error?.message
      ? [
          {
            path: '',
            message: error?.message
          }
        ]
      : [];
  } else if (error instanceof Error) {
    message = error?.message;
    errorMessages = error?.message
      ? [
          {
            path: '',
            message: error?.message
          }
        ]
      : [];
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    stack: NODE_ENV === 'development' ? error?.stack : undefined
  });

  next();
};

export default globalErrorHandler;
