import { OrderStatusEnum, PaymentType } from '@src/enums';
import { IQueue } from './Queue.type';
import { IRoom } from './Room.type';
import { IRoomBooking } from './RoomBooking.type';
export interface IOrder {
    id?: any;
    paxCount: number;
    subTotalAmount: number;
    totalQty: number;
    seniorCount: number;
    discountAmount: number;
    totalAmount: number;
    paymentType: PaymentType;
    roomBookingId: string;
    roomBooking?: IRoomBooking;
    roomId: string;
    room?: IRoom;
    status: OrderStatusEnum;
    queueId: string;
    queue?: IQueue;
    created?: Date;
    updated?: Date | null;
    deleted?: Date | null;
}
