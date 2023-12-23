import { BookingStatusEnum } from '@src/enums';
import { ICustomer } from './Customer.type';
import { IRoom } from './Room.type';
export interface IRoomBooking {
    id?: any;
    customerId: string;
    customer?: ICustomer;
    roomId: string;
    room?: IRoom;
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
    created?: Date;
    updated?: Date | null;
    deleted?: Date | null;
}
