import { Gender, LoginType, Role } from '@/common/constants';

export interface IUser {
  id?: string;
  email: string;
  password: string;
  role: Role;
  gender: Gender;
  phone: string;
  avatar: string;
  login_type: LoginType;
}
