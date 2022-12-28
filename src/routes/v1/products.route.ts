import { Router } from 'express';
import { ProductsController } from '@/controllers';
import { IRoute } from '@/interfaces';
import { CRUDRouter } from '@routes/crud.route';
import { QueryMiddleware } from '@/middlewares';

export class ProductsRoute extends CRUDRouter<ProductsController> {
  public path = '/products';

  constructor() {
    super(new ProductsController());
    this.customRouting();
  }

  public customRouting() {
    this.router.get(`${this.path}`, QueryMiddleware, this.controller.getList);
  }
}
