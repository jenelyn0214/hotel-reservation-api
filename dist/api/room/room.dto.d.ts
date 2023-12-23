import { RoomStatusEnum } from '@src/enums';
import { IRoom } from '@src/interfaces';
import { RoomTypeDTO } from '../room-type/room-type.dto';
export declare class RoomDTO implements IRoom {
    id?: string;
    created?: Date;
    updated?: Date;
    deleted?: Date;
    number: string;
    roomTypeId: string;
    roomType?: RoomTypeDTO;
    price: number;
    maxPax: number;
    status: RoomStatusEnum;
}
declare const RoomRequestDTO_base: import("@nestjs/common").Type<Omit<RoomDTO, "id" | "created" | "updated" | "deleted" | "roomType">>;
export declare class RoomRequestDTO extends RoomRequestDTO_base {
}
export declare class CreateRoomDTO extends RoomRequestDTO {
}
declare const UpdateRoomDTO_base: import("@nestjs/common").Type<Partial<RoomRequestDTO>>;
export declare class UpdateRoomDTO extends UpdateRoomDTO_base {
}
declare const FilterRoomDTO_base: import("@nestjs/common").Type<Partial<Omit<RoomDTO, "id" | "created" | "updated" | "deleted" | "roomType" | "status">>>;
export declare class FilterRoomDTO extends FilterRoomDTO_base {
    status?: RoomStatusEnum[];
}
export {};
