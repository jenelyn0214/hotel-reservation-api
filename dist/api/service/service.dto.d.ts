import { ServiceTypeEnum } from '@src/enums';
import { IService } from '@src/interfaces';
export declare class ServiceDTO implements IService {
    id?: string;
    created?: Date;
    updated?: Date;
    deleted?: Date;
    name: string;
    type: ServiceTypeEnum;
    price: number;
}
declare const ServiceRequestDTO_base: import("@nestjs/common").Type<Omit<ServiceDTO, "id" | "created" | "updated" | "deleted">>;
export declare class ServiceRequestDTO extends ServiceRequestDTO_base {
}
export declare class CreateServiceDTO extends ServiceRequestDTO {
}
declare const UpdateServiceDTO_base: import("@nestjs/common").Type<Partial<ServiceRequestDTO>>;
export declare class UpdateServiceDTO extends UpdateServiceDTO_base {
}
declare const FilterServiceDTO_base: import("@nestjs/common").Type<Partial<Omit<ServiceDTO, "id" | "created" | "updated" | "deleted" | "type">>>;
export declare class FilterServiceDTO extends FilterServiceDTO_base {
    type?: ServiceTypeEnum[];
}
export {};
