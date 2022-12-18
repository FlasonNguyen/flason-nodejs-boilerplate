import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import config from '@config';
import { UserModel } from '@models';
import { UserDto } from '@/models/dtos';
import { HttpException } from '@exceptions';
import { DataStoredInToken, IUser, TokenData } from '@interfaces';
import { isEmpty } from '@utils';

export class AuthService {
  constructor(private model: typeof UserModel) {}

  // public model = UserModel;

  public async signup(userData: UserDto): Promise<IUser> {
    if (isEmpty(userData)) throw new HttpException(400, 'userData is empty');

    const findUser: IUser = await this.model.findOne({ where: { email: userData.email } });
    if (findUser) throw new HttpException(409, `This email ${userData.email} already exists`);

    const hashedPassword = await bcrypt.hash(userData.password, 10);
    return await this.model.create({ ...userData, password: hashedPassword });
  }

  public async login(userData: UserDto): Promise<{ cookie: string; findUser: IUser }> {
    if (isEmpty(userData)) throw new HttpException(400, 'userData is empty');

    const findUser: IUser = await this.model.findOne({ where: { email: userData.email } });
    if (!findUser) throw new HttpException(409, `This email ${userData.email} was not found`);

    const isPasswordMatching: boolean = await bcrypt.compare(userData.password, findUser.password);
    if (!isPasswordMatching) throw new HttpException(409, 'Password not matching');

    const tokenData = this.createToken(findUser);
    const cookie = this.createCookie(tokenData);

    return { cookie, findUser };
  }

  public async logout(userData: IUser): Promise<IUser> {
    if (isEmpty(userData)) throw new HttpException(400, 'userData is empty');

    const findUser: IUser = await this.model.findOne({ where: { email: userData.email, password: userData.password } });
    if (!findUser) throw new HttpException(409, "User doesn't exist");

    return findUser;
  }

  public createToken(user: IUser): TokenData {
    const dataStoredInToken: DataStoredInToken = { id: user.id, role: user.role, type: user.type };
    const secretKey: string = config.SECRET_KEY;
    const expiresIn: number = 60 * 60;

    return { expiresIn, token: jwt.sign(dataStoredInToken, secretKey, { expiresIn }) };
  }

  public createCookie(tokenData: TokenData): string {
    return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn};`;
  }
}
