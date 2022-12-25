import {Router} from 'express';
import {ProductsController} from '@/controllers';
import {ProductDto} from '@/models/dtos';
import {IRoute} from '@/interfaces';
import {validationMiddleware} from '@/middlewares';

export class UsersRoute implements IRoute {
    public path = '/users';
    public router = Router();
    public usersController = new ProductsController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {

    }
}
