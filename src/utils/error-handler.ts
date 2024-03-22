import { Request, Response, NextFunction } from 'express';
import { AxiosError } from 'axios';

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  let statusCode = 500;
  let message = `Internal Server Error!`;
  if (err instanceof AxiosError) {
    switch (err.response.status) {
      case 401:
        statusCode = 401;
        message = `Unauthorized! Please check the token.`;
        break;
      default:
        statusCode = err.response.status;
        message = err.response.statusText;
        break;
    }
  }
  return res.status(statusCode).json({
    success: false,
    message
  });
};
