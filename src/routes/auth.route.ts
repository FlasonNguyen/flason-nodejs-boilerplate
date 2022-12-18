import { Router } from 'express';
import { AuthController } from '@controllers';
import { UserDto } from '@/models/dtos';
import { IRoute } from '@interfaces';
import { authMiddleware } from '@middlewares';
import { validationMiddleware } from '@middlewares';

export class AuthRoute implements IRoute {
  public path = '/';
  public router = Router();
  public authController = new AuthController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}signup`, validationMiddleware(UserDto, 'body'), this.authController.signUp);
    this.router.post(`${this.path}login`, validationMiddleware(UserDto, 'body'), this.authController.logIn);
    this.router.post(`${this.path}logout`, authMiddleware, this.authController.logOut);
  }
}
