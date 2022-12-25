import { CRUDController } from '@controllers/crud.controller';
import { Request, Response, NextFunction, Router } from 'express';
import { BaseRouter } from '@routes/base.route';

export class CRUDRouter<T extends CRUDController<any>> extends BaseRouter {
  constructor(controller: T) {
    super();
    this.controller = controller;
    this.router = Router();
    this.customRouting();
    this.defaultRouting();
  }

  protected controller: T;
  protected router: Router;

  public customRouting() {}

  public defaultRouting() {
    this.router.get('/', this.controller.getList);
  }
}
