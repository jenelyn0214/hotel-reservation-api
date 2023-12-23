import { RoomBookingDTO } from '@src/api/room-booking/room-booking.dto';
import { IBookingService } from '@src/interfaces';
import { ServiceDTO } from '../service/service.dto';
export declare class BookingServiceDTO implements IBookingService {
    id?: string;
    created?: Date;
    updated?: Date;
    deleted?: Date;
    roomBookingId: string;
    roomBooking?: RoomBookingDTO;
    serviceId: string;
    service?: ServiceDTO;
    qty: number;
    price: number;
}
declare const BookingServiceRequestDTO_base: import("@nestjs/common").Type<Omit<BookingServiceDTO, "id" | "created" | "updated" | "deleted" | "roomBooking" | "service">>;
export declare class BookingServiceRequestDTO extends BookingServiceRequestDTO_base {
}
export declare class CreateBookingServiceDTO extends BookingServiceRequestDTO {
}
declare const UpdateBookingServiceDTO_base: import("@nestjs/common").Type<Partial<BookingServiceRequestDTO>>;
export declare class UpdateBookingServiceDTO extends UpdateBookingServiceDTO_base {
}
declare const FilterBookingServiceDTO_base: import("@nestjs/common").Type<Partial<Omit<BookingServiceDTO, "id" | "created" | "updated" | "deleted" | "roomBooking" | "service">>>;
export declare class FilterBookingServiceDTO extends FilterBookingServiceDTO_base {
}
export {};
