import { ErrorRequestHandler } from 'express';
import httpStatus from 'http-status';
import config from '@server/config';
import ApiError from '../utils/ApiError';
import { logger } from '@server/config/logger';
import { inspect } from 'util';

export const errorConverter: ErrorRequestHandler = (err, _req, _res, next) => {
  let error = err;

  if (!(error instanceof ApiError)) {
    const statusCode = error.statusCode || error.status ? httpStatus.BAD_REQUEST : httpStatus.INTERNAL_SERVER_ERROR;
    const message = error.message || httpStatus[statusCode];
    error = new ApiError(statusCode, message, error.data, false, err.stack);
  }

  next(error);
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  let { statusCode, message } = err;
  const { errors } = err;
  if (config.env === 'production' && !err.isOperational) {
    statusCode = httpStatus.INTERNAL_SERVER_ERROR;
    message = httpStatus[httpStatus.INTERNAL_SERVER_ERROR];
  }

  res.locals.errorMessage = err.message;

  const response = {
    code: statusCode || 500,
    message,
    errors,
    ...(config.env === 'development' && { stack: err.stack }),
  };

  if (config.env === 'development') {
    logger.error('Error Handler', err);
  }

  try {
    res.status(response.code).send(response);
  } catch (e) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
      error: 'Something went wrong!',
      details: inspect(response),
    });
  }
};
