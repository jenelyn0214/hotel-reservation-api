import { HallStatusEnum } from '@src/enums';
import { IHall } from '@src/interfaces';
export declare class HallDTO implements IHall {
    id?: string;
    created?: Date;
    updated?: Date;
    deleted?: Date;
    name: string;
    description: string;
    price: number;
    maxPax: number;
    status: HallStatusEnum;
}
declare const HallRequestDTO_base: import("@nestjs/common").Type<Omit<HallDTO, "id" | "created" | "updated" | "deleted">>;
export declare class HallRequestDTO extends HallRequestDTO_base {
}
export declare class CreateHallDTO extends HallRequestDTO {
}
declare const UpdateHallDTO_base: import("@nestjs/common").Type<Partial<HallRequestDTO>>;
export declare class UpdateHallDTO extends UpdateHallDTO_base {
}
declare const FilterHallDTO_base: import("@nestjs/common").Type<Partial<Omit<HallDTO, "id" | "created" | "updated" | "deleted" | "status">>>;
export declare class FilterHallDTO extends FilterHallDTO_base {
    status?: HallStatusEnum[];
}
export {};
