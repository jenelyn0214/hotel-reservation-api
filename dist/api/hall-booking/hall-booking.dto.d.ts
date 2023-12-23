import { HallDTO } from '@src/api/hall/hall.dto';
import { BookingStatusEnum } from '@src/enums';
import { IHallBooking } from '@src/interfaces';
import { CustomerDTO } from '../customer/customer.dto';
export declare class HallBookingDTO implements IHallBooking {
    id?: string;
    created?: Date;
    updated?: Date;
    deleted?: Date;
    customerId: string;
    customer?: CustomerDTO;
    hallId: string;
    hall?: HallDTO;
    startDate: Date;
    endDate: Date;
    paxCount: number;
    amount: number;
    status: BookingStatusEnum;
}
declare const HallBookingRequestDTO_base: import("@nestjs/common").Type<Omit<HallBookingDTO, "id" | "created" | "updated" | "deleted" | "customer" | "hall">>;
export declare class HallBookingRequestDTO extends HallBookingRequestDTO_base {
}
export declare class CreateHallBookingDTO extends HallBookingRequestDTO {
}
declare const UpdateHallBookingDTO_base: import("@nestjs/common").Type<Partial<HallBookingRequestDTO>>;
export declare class UpdateHallBookingDTO extends UpdateHallBookingDTO_base {
}
declare const FilterHallBookingDTO_base: import("@nestjs/common").Type<Partial<Omit<HallBookingDTO, "id" | "created" | "updated" | "deleted" | "status" | "customer" | "hall">>>;
export declare class FilterHallBookingDTO extends FilterHallBookingDTO_base {
    status?: BookingStatusEnum[];
}
export {};
