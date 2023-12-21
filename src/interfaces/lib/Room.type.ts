import { RoomStatusEnum } from '@src/enums';

import { IRoomBooking } from './RoomBooking.type';
import { IRoomType } from './RoomType.type';

export interface IRoom {
  id?: any;
  number: string;
  roomTypeId: string;
  roomType: IRoomType;
  roomBookingId: string;
  roomBooking: IRoomBooking;
  status: RoomStatusEnum;
  created?: Date;
  updated?: Date | null;
  deleted?: Date | null;
}
