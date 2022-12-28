import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import config from '@config';
import { UserEntity } from '@/models';
import { UserDto } from '@/models/dtos';
import { AppException } from '@/common/exceptions';
import { DataStoredInToken, IUser } from '@/interfaces';
import { isEmpty } from '@/utils';
import { CRUDService } from '@services/crud.service';

export class AuthService extends CRUDService<UserEntity> {
  // public model = UserModel;
  constructor() {
    super(UserEntity);
  }

  public async signup(userData: UserDto): Promise<IUser> {
    if (isEmpty(userData)) throw new AppException(400, 'userData is empty');

    const findUser: IUser = await this.model.findOne({ where: { email: userData.email } });
    if (findUser) throw new AppException(409, `This email ${userData.email} already exists`);

    const hashedPassword = await bcrypt.hash(userData.password, 10);
    return await this.model.create({ ...userData, password: hashedPassword });
  }

  public async login(userData: UserDto): Promise<{ cookie: string; findUser: IUser }> {
    if (isEmpty(userData)) throw new AppException(400, 'userData is empty');

    const findUser: IUser = await this.model.scope('withPassword').findOne({
      where: { email: userData.email },
      raw: true,
    });
    if (!findUser) throw new AppException(409, `This email ${userData.email} was not found`);
    const isPasswordMatching: boolean = await bcrypt.compare(userData.password, findUser.password);
    if (!isPasswordMatching) throw new AppException(409, 'Password not matching');

    const accessToken = this.createAccessToken(findUser);
    const refreshToken = this.createRefreshToken(findUser);
    const cookie = this.createCookie(accessToken, refreshToken);

    return { cookie, findUser };
  }

  public createAccessToken(user: IUser): Object {
    const dataStoredInToken: DataStoredInToken = { id: user.id, role: user.role };
    const secretKey: string = config.SECRET_KEY;
    const expiresIn: number = 60 * 60;
    const accessToken: string = jwt.sign(dataStoredInToken, secretKey, { expiresIn });

    return { accessToken, expiresIn };
  }

  public createRefreshToken(user: IUser): Object {
    const dataStoredInToken: DataStoredInToken = { id: user.id, role: user.role };
    const secretKey: string = config.SECRET_KEY;
    const expiresIn: number = 60 * 60 * 24 * 7;
    const refreshToken: string = jwt.sign(dataStoredInToken, secretKey, { expiresIn });
    return { refreshToken, expiresIn };
  }

  public createCookie(accessToken: any, refreshToken: any): string {
    return `Authorization=${accessToken.accessToken}; HttpOnly; Max-Age=${accessToken.expiresIn}`;
  }
}
