import {Router} from 'express';
import {ProductsController} from '@/controllers';
import {IRoute} from '@/interfaces';
import {CRUDRouter} from '@routes/crud.route';
import {QueryMiddleware} from '@/middlewares';

export class UsersRoute extends CRUDRouter<ProductsController> implements IRoute {
    public path = '/products';
    public router = Router();

    constructor() {
        super(new ProductsController());
        this.customRouting();
    }

    public customRouting() {
        this.router.get(`${this.path}`, QueryMiddleware, this.route(this.getList));
    }
}
