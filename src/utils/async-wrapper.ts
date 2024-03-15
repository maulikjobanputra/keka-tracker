import { NextFunction, Request, Response } from 'express';
import { AsyncFunction, RESPONSE } from '../interfaces/common';
import { StatusCode } from '../constants/status-code';

export const asyncWrapper = (handler: AsyncFunction) => (req: Request, res: Response, next: NextFunction) => {
  Promise.resolve(handler(req, res, next))
    .then((response: RESPONSE) => {
      const { statusCode, data } = response;
      return res.status(statusCode || StatusCode.OK).json(data);
    })
    .catch((err) => {
      next(err);
    });
};
