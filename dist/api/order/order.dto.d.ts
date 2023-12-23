import { RoomDTO } from '@src/api/room/room.dto';
import { BookingStatusEnum, OrderStatusEnum, PaymentType } from '@src/enums';
import { IOrder } from '@src/interfaces';
import { QueueDTO } from '../queue/queue.dto';
import { RoomBookingDTO } from '../room-booking/room-booking.dto';
export declare class OrderDTO implements IOrder {
    id?: string;
    created?: Date;
    updated?: Date;
    deleted?: Date;
    paxCount: number;
    subTotalAmount: number;
    totalQty: number;
    seniorCount: number;
    discountAmount: number;
    totalAmount: number;
    paymentType: PaymentType;
    roomBookingId: string;
    roomBooking?: RoomBookingDTO;
    roomId: string;
    room?: RoomDTO;
    queueId: string;
    queue?: QueueDTO;
    status: OrderStatusEnum;
}
declare const OrderRequestDTO_base: import("@nestjs/common").Type<Omit<OrderDTO, "id" | "created" | "updated" | "deleted" | "room" | "roomBooking" | "queue">>;
export declare class OrderRequestDTO extends OrderRequestDTO_base {
}
export declare class CreateOrderDTO extends OrderRequestDTO {
}
declare const UpdateOrderDTO_base: import("@nestjs/common").Type<Partial<OrderRequestDTO>>;
export declare class UpdateOrderDTO extends UpdateOrderDTO_base {
}
declare const FilterOrderDTO_base: import("@nestjs/common").Type<Partial<Omit<OrderDTO, "id" | "created" | "updated" | "deleted" | "status" | "room" | "roomBooking" | "paymentType" | "queue">>>;
export declare class FilterOrderDTO extends FilterOrderDTO_base {
    status?: BookingStatusEnum[];
    paymentType?: BookingStatusEnum[];
}
export {};
