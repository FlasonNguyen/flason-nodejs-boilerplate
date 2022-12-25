import { NextFunction, Request, Response } from 'express';
import { UserDto } from '@/models/dtos';
import { UserService } from '@/services';
import { CRUDController } from '@controllers/crud.controller';

export class UsersController extends CRUDController<UserService> {
  constructor() {
    super(new UserService());
  }

  public getUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllUsersData: UserDto[] = await this.service.findAllUser();

      res.status(200).json({ data: findAllUsersData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getUserById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.params.id;
      const findOneUserData: UserDto = await this.service.findUserById(userId);

      res.status(200).json({ data: findOneUserData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData: UserDto = req.body;
      const createUserData: UserDto = await this.service.createUser(userData);

      res.status(201).json({ data: createUserData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.params.id;
      const userData: UserDto = req.body;
      const updateUserData: UserDto = await this.service.updateUser(userId, userData);

      res.status(200).json({ data: updateUserData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.params.id;
      const deleteUserData: UserDto = await this.service.deleteUser(userId);

      res.status(200).json({ data: deleteUserData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}
