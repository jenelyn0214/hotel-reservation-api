import { CreateUserDTO } from '@src/api/user/user.dto';
import { UserTypeEnum } from '@src/enums';
export const users: CreateUserDTO[] = [
  {
    email: 'admin.hotel@lnu.com',
    firstName: 'Admin',
    lastName: '',
    username: 'admin',
    password: 'admin-123!',
    type: UserTypeEnum.ADMINISTRATOR,
  },
];
