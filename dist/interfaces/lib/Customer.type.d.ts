import { GenderEnum } from '@src/enums';
export interface ICustomer {
    id?: any;
    firstName: string;
    lastName: string;
    middleName?: string | null;
    fullName?: string | null;
    gender: GenderEnum;
    email: string;
    created?: Date;
    updated?: Date | null;
    deleted?: Date | null;
}
