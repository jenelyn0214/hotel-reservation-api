import { UserTypeEnum } from '@src/enums';

export interface IUser {
  id?: any;
  firstName: string;
  lastName: string;
  middleName?: string | null;
  fullName?: string | null;
  email: string;
  username: string;
  password: string;
  type: UserTypeEnum;
  refreshToken?: string;
  created?: Date;
  updated?: Date | null;
  deleted?: Date | null;
}
