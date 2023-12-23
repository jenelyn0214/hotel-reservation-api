import { UserTypeEnum } from '@src/enums';
import { IUser } from '@src/interfaces';
export declare class UserDTO implements IUser {
    id?: string;
    created?: Date;
    updated?: Date;
    deleted?: Date;
    refreshToken?: string | null;
    fullName?: string | null;
    firstName: string;
    lastName: string;
    middleName?: string | null;
    email: string;
    username: string;
    password: string;
    type: UserTypeEnum;
}
declare const UserRequestDTO_base: import("@nestjs/common").Type<Omit<UserDTO, "id" | "created" | "updated" | "deleted" | "fullName">>;
export declare class UserRequestDTO extends UserRequestDTO_base {
}
export declare class CreateUserDTO extends UserRequestDTO {
}
declare const UpdateUserDTO_base: import("@nestjs/common").Type<Partial<UserRequestDTO>>;
export declare class UpdateUserDTO extends UpdateUserDTO_base {
}
declare const FilterUserDTO_base: import("@nestjs/common").Type<Partial<Omit<UserDTO, "id" | "refreshToken" | "created" | "updated" | "deleted" | "password" | "type">>>;
export declare class FilterUserDTO extends FilterUserDTO_base {
    type?: UserTypeEnum[];
    createdFrom?: Date;
    createdTo?: Date;
}
export {};
