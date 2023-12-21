import { CreateUserDTO } from '@src/api/user/user.dto';
import { UserIDTypeEnum } from '@src/enums';
export const users: CreateUserDTO[] = [
  {
    birthday: new Date('01/01/1993'),
    email: 'admin.iboardliving@gmail.com',
    firstName: 'Admin',
    gender: '',
    lastName: '',
    location: '',
    password: 'admin-123!',
    phoneNumber: '',
    photoPath: 'v1684397190/image/logo/icon_logo_rrcoxf.png',
    placeIssued: null,
    dateIssued: null,
    validIDNo: null,
    type: UserIDTypeEnum.iEMPLOYEE,
    active: true,
    confirmed: true,
  },
];
