import { hash } from 'bcrypt';
import { UserModel } from '@models';
import { UserDto } from '@/models/dtos';
import { HttpException } from '@exceptions';
import { IUser } from '@interfaces';
import { isEmpty } from '@utils';

export class UserService {
  public users = UserModel;

  public async findAllUser(): Promise<IUser[]> {
    const allUser: IUser[] = await this.users.findAll();
    return allUser;
  }

  public async findUserById(userId: string): Promise<IUser> {
    if (isEmpty(userId)) throw new HttpException(400, 'UserId is empty');

    const findUser: IUser = await this.users.findByPk(userId);
    if (!findUser) throw new HttpException(409, "UsersInterface doesn't exist");

    return findUser;
  }

  public async createUser(userData: UserDto): Promise<IUser> {
    if (isEmpty(userData)) throw new HttpException(400, 'userData is empty');

    const findUser: IUser = await this.users.findOne({ where: { email: userData.email } });
    if (findUser) throw new HttpException(409, `This email ${userData.email} already exists`);

    const hashedPassword = await hash(userData.password, 10);
    const createUserData: IUser = await this.users.create({ ...userData, password: hashedPassword });
    return createUserData;
  }

  public async updateUser(userId: string, userData: UserDto): Promise<IUser> {
    if (isEmpty(userData)) throw new HttpException(400, 'userData is empty');

    const findUser: IUser = await this.users.findByPk(userId);
    if (!findUser) throw new HttpException(409, "UsersInterface doesn't exist");

    const hashedPassword = await hash(userData.password, 10);
    await this.users.update({ ...userData, password: hashedPassword }, { where: { id: userId } });

    const updateUser: IUser = await this.users.findByPk(userId);
    return updateUser;
  }

  public async deleteUser(userId: string): Promise<IUser> {
    if (isEmpty(userId)) throw new HttpException(400, "UsersInterface doesn't existId");

    const findUser: IUser = await this.users.findByPk(userId);
    if (!findUser) throw new HttpException(409, "UsersInterface doesn't exist");

    await this.users.destroy({ where: { id: userId } });

    return findUser;
  }
}
