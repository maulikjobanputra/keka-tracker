require('dotenv').config();
import express, { Application, Router } from 'express';
import bodyParser from 'body-parser';

const { PORT } = process.env;

export class App {
  public app: Application;
  private port: string | number;
  constructor(routers: Router[]) {
    this.app = express();
    this.initializeMiddlewares();
    this.initializeRouters(routers);
    this.port = PORT || 3333;
  }
  initializeMiddlewares() {
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(express.json());
  }
  initializeRouters(routers: Router[]) {
    for (const router of routers) {
      this.app.use('/', router);
    }
  }
  listen() {
    this.app.listen(this.port, () => {
      console.log(`App running on port ${this.port}!`);
    });
  }
}
