import { GenderEnum } from '@src/enums';
import { ICustomer } from '@src/interfaces';
export declare class CustomerDTO implements ICustomer {
    id?: string;
    created?: Date;
    updated?: Date;
    deleted?: Date;
    fullName?: string | null;
    firstName: string;
    lastName: string;
    middleName?: string | null;
    email: string;
    gender: GenderEnum;
}
declare const CustomerRequestDTO_base: import("@nestjs/common").Type<Omit<CustomerDTO, "id" | "created" | "updated" | "deleted">>;
export declare class CustomerRequestDTO extends CustomerRequestDTO_base {
}
export declare class CreateCustomerDTO extends CustomerRequestDTO {
}
declare const UpdateCustomerDTO_base: import("@nestjs/common").Type<Partial<CustomerRequestDTO>>;
export declare class UpdateCustomerDTO extends UpdateCustomerDTO_base {
}
declare const FilterCustomerDTO_base: import("@nestjs/common").Type<Partial<Omit<CustomerDTO, "id" | "created" | "updated" | "deleted">>>;
export declare class FilterCustomerDTO extends FilterCustomerDTO_base {
}
export {};
