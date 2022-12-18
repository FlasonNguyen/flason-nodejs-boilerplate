import { Router } from 'express';
import { IndexController } from '@controllers';
import { IRoute } from '@interfaces';

export class IndexRoute implements IRoute {
  public path = '/';
  public router = Router();
  public indexController = new IndexController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.indexController.index);
  }
}
