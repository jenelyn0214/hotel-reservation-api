import { BookingStatusEnum } from '@src/enums';
import { ICustomer } from './Customer.type';
import { IHall } from './Hall.type';
export interface IHallBooking {
    id?: any;
    customerId: string;
    customer?: ICustomer;
    hallId: string;
    hall?: IHall;
    startDate: Date;
    endDate: Date;
    paxCount: number;
    amount: number;
    status: BookingStatusEnum;
    created?: Date;
    updated?: Date | null;
    deleted?: Date | null;
}
