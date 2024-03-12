/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, RequestHandler, Request, Response } from 'express';
import * as core from 'express-serve-static-core';

export const catchAsync =
  <T>(fn: RequestHandler<core.ParamsDictionary, any, T, core.Query, Record<string, any>>) =>
  (req: Request<core.ParamsDictionary, any, T, core.Query, Record<string, any>>, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch((err) => {
      next(err);
    });
  };
