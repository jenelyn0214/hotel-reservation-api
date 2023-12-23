import { MenuStatusEnum } from '@src/enums';
import { IMenu } from '@src/interfaces';
export declare class MenuDTO implements IMenu {
    id?: string;
    created?: Date;
    updated?: Date;
    deleted?: Date;
    name: string;
    price: number;
    status: MenuStatusEnum;
}
declare const MenuRequestDTO_base: import("@nestjs/common").Type<Omit<MenuDTO, "id" | "created" | "updated" | "deleted">>;
export declare class MenuRequestDTO extends MenuRequestDTO_base {
}
export declare class CreateMenuDTO extends MenuRequestDTO {
}
declare const UpdateMenuDTO_base: import("@nestjs/common").Type<Partial<MenuRequestDTO>>;
export declare class UpdateMenuDTO extends UpdateMenuDTO_base {
}
declare const FilterMenuDTO_base: import("@nestjs/common").Type<Partial<Omit<MenuDTO, "id" | "created" | "updated" | "deleted" | "status">>>;
export declare class FilterMenuDTO extends FilterMenuDTO_base {
    status?: MenuStatusEnum[];
}
export {};
