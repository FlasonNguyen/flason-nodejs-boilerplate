import { CRUDController } from '@controllers/crud.controller';
import { Request, Response, NextFunction, Router } from 'express';
import { BaseRouter } from '@routes/base.route';
import { QueryMiddleware } from '@/middlewares';

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
    this.router.get('/', QueryMiddleware, this.route(this.getList));
    this.router.get('/:id', QueryMiddleware, this.route(this.getItem));
  }

  async getList(req: Request, res: Response) {
    const result = await this.controller.getList(req.queryInfo);
    this.onSuccessPaginate(res, result, req.queryInfo);
  }

  async getItem(req: Request, res: Response) {
    const { id } = req.params;
    req.queryInfo.filter.id = id;
    const result = await this.controller.getItem(req.queryInfo);
    this.onSuccess(res, result);
  }
}
