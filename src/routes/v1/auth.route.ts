import { Router } from 'express';
import { AuthController } from '@/controllers';
import { UserDto } from '@/models/dtos';
import { IRoute } from '@/interfaces';
import { authMiddleware } from '@/middlewares';
import { validationMiddleware } from '@/middlewares';

export class AuthRoute implements IRoute {
  public path = '/auth/';
  public router = Router();
  public authController = new AuthController();

  constructor() {
    this.customRouting();
  }

  private customRouting() {
    this.router.post(`${this.path}signup`, validationMiddleware(UserDto, 'body', true), this.authController.signUp);
    this.router.post(`${this.path}login`, validationMiddleware(UserDto, 'body', true), this.authController.logIn);
    this.router.post(`${this.path}logout`, authMiddleware, this.authController.logOut);
  }
}
