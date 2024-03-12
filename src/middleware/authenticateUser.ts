import jwt from 'jws';
import { Response, Request, NextFunction, RequestHandler } from 'express';
// import { publickKey, privateKey } from "@server/constants/user";
import { logger } from '@server/config/logger';
import fs from 'fs';
import ApiError from '@server/utils/ApiError';
import httpStatus from 'http-status';
import { catchAsync } from '@server/utils/catchAsync';

export const authenticateUser: RequestHandler = catchAsync((req: Request, _res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1] as string;
  if (!token) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Unauthorized');
  }

  const publickKey = fs.readFileSync('src/constants/public.pem', 'utf8');

  const authenticated = jwt.verify(token, 'RS256', publickKey);
  if (authenticated) {
    logger.info('User authenticated: ' + authenticated);
    next();
  } else {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Unauthorized');
  }
});
