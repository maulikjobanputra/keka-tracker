import { NextFunction, Request, Response } from 'express';

export interface ObjectType {
  [key: string]: any;
}
export interface RESPONSE {
  statusCode: number;
  data: ObjectType;
}
export type AsyncFunction = (req: Request, res: Response, next: NextFunction) => Promise<any>;
