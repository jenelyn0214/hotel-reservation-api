import { RoomStatusEnum } from '@src/enums';
import { IRoomType } from './RoomType.type';
export interface IRoom {
    id?: any;
    number: string;
    roomTypeId: string;
    roomType?: IRoomType;
    price: number;
    maxPax: number;
    status: RoomStatusEnum;
    created?: Date;
    updated?: Date | null;
    deleted?: Date | null;
}
