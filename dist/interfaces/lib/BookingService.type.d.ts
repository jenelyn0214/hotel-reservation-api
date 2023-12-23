import { IRoomBooking } from './RoomBooking.type';
import { IService } from './Service.type';
export interface IBookingService {
    id?: any;
    roomBookingId: string;
    roomBooking?: IRoomBooking;
    serviceId: string;
    service?: IService;
    qty: number;
    price: number;
    created?: Date;
    updated?: Date | null;
    deleted?: Date | null;
}
