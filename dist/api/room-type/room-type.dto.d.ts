import { IRoomType } from '@src/interfaces';
export declare class RoomTypeDTO implements IRoomType {
    id?: string;
    created?: Date;
    updated?: Date;
    deleted?: Date;
    name: string;
    price: number;
    maxPax: number;
}
declare const RoomTypeRequestDTO_base: import("@nestjs/common").Type<Omit<RoomTypeDTO, "id" | "created" | "updated" | "deleted">>;
export declare class RoomTypeRequestDTO extends RoomTypeRequestDTO_base {
}
export declare class CreateRoomTypeDTO extends RoomTypeRequestDTO {
}
declare const UpdateRoomTypeDTO_base: import("@nestjs/common").Type<Partial<RoomTypeRequestDTO>>;
export declare class UpdateRoomTypeDTO extends UpdateRoomTypeDTO_base {
}
declare const FilterRoomTypeDTO_base: import("@nestjs/common").Type<Partial<Omit<RoomTypeDTO, "id" | "created" | "updated" | "deleted">>>;
export declare class FilterRoomTypeDTO extends FilterRoomTypeDTO_base {
}
export {};
