import { Request, Response, NextFunction } from 'express';
import { RESPONSE } from '../interfaces/common';
import { Service } from '../services/services';
import { format } from 'date-fns';

const services = new Service();
const { defaultService, getHours, getPartialDetails, getAverage } = services;

export class DefaultController {
  public async defaultController(req: Request, res: Response, next: NextFunction): Promise<RESPONSE> {
    try {
      return await defaultService();
    } catch (error) {
      console.log(`Error while connecting to server!`);
      throw error;
    }
  }
  public async hoursController(req: Request, res: Response, next: NextFunction): Promise<RESPONSE> {
    let { date, authToken } = req.query as { date: string; authToken: string };
    try {
      date =
        date ||
        format(
          new Date().toLocaleString('en-US', {
            timeZone: 'Asia/Kolkata'
          }),
          'yyyy-MM-dd'
        );
      return await getHours(date, authToken);
    } catch (error) {
      console.log(`Error while getting hours for ${date}!`);
      throw error;
    }
  }
  public async partialController(req: Request, res: Response, next: NextFunction): Promise<RESPONSE> {
    const { authToken } = req.query as { authToken: string };
    try {
      return await getPartialDetails(authToken);
    } catch (error) {
      console.log(`Error while getting partial details!`);
      throw error;
    }
  }
  public async averageController(req: Request, res: Response, next: NextFunction): Promise<RESPONSE> {
    const { toDate, fromDate, authToken } = req.query as { fromDate: string; toDate: string; authToken: string };
    try {
      return await getAverage(fromDate, toDate, authToken);
    } catch (error) {
      console.log(`Error while getting average details!`);
      throw error;
    }
  }
}
