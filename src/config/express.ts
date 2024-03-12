import express from 'express';
import routes from '@server/routes';
// import morgan from './morgan';
import ApiError from '@server/utils/ApiError';
import httpStatus from 'http-status';
import { errorConverter, errorHandler } from '@server/middleware/error-middleware';

const createServer = (): express.Application => {
  const app = express();

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  app.disable('x-powered-by');

  // api routes entry for point of sale (pos)
  app.use('/pos', routes);

  app.get('/health', (_req, res) => {
    res.status(httpStatus.OK).send('UP');
  });

  // send back a 404 error for any unknown api request
  app.use((_req, _res, next) => {
    next(new ApiError(httpStatus.NOT_FOUND, 'Unknown API endpoint'));
  });

  // convert error to ApiError, if needed
  app.use(errorConverter);

  // handle error
  app.use(errorHandler);

  return app;
};

export { createServer };
