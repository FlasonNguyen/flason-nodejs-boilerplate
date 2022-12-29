import { Router } from 'express';
import { UsersController } from '@/controllers';
import { UserDto } from '@/models/dtos';
import { QueryMiddleware, validationMiddleware } from '@/middlewares';
import { CRUDRouter } from '@routes/crud.route';

export class UsersRoute extends CRUDRouter<UsersController> {
  public path = '/users';

  constructor() {
    super(new UsersController());
    this.customRouting();
  }

  public customRouting() {
    this.router.get(`${this.path}`, QueryMiddleware, this.controller.getUsers);
    this.router.get(`${this.path}/:id`, this.controller.getUserById);
    this.router.post(`${this.path}`, validationMiddleware(UserDto, 'body', true), this.controller.createUser);
    this.router.put(`${this.path}/:id`, validationMiddleware(UserDto, 'body', true), this.controller.updateUser);
    this.router.delete(`${this.path}/:id`, this.controller.deleteUser);
  }
}
