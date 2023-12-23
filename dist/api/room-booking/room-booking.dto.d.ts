import { RoomDTO } from '@src/api/room/room.dto';
import { BookingStatusEnum } from '@src/enums';
import { IRoomBooking } from '@src/interfaces';
import { CustomerDTO } from '../customer/customer.dto';
export declare class RoomBookingDTO implements IRoomBooking {
    id?: string;
    created?: Date;
    updated?: Date;
    deleted?: Date;
    customerId: string;
    customer?: CustomerDTO;
    roomId: string;
    room?: RoomDTO;
    startDate: Date;
    endDate: Date;
    paxCount: number;
    adultCount: number;
    childCount: number;
    seniorCount: number;
    subTotalAmount: number;
    discountAmount: number;
    totalAmount: number;
    status: BookingStatusEnum;
}
declare const RoomBookingRequestDTO_base: import("@nestjs/common").Type<Omit<RoomBookingDTO, "id" | "created" | "updated" | "deleted" | "room" | "customer">>;
export declare class RoomBookingRequestDTO extends RoomBookingRequestDTO_base {
}
export declare class CreateRoomBookingDTO extends RoomBookingRequestDTO {
}
declare const UpdateRoomBookingDTO_base: import("@nestjs/common").Type<Partial<RoomBookingRequestDTO>>;
export declare class UpdateRoomBookingDTO extends UpdateRoomBookingDTO_base {
}
declare const FilterRoomBookingDTO_base: import("@nestjs/common").Type<Partial<Omit<RoomBookingDTO, "id" | "created" | "updated" | "deleted" | "status" | "room" | "customer">>>;
export declare class FilterRoomBookingDTO extends FilterRoomBookingDTO_base {
    status?: BookingStatusEnum[];
}
export {};
