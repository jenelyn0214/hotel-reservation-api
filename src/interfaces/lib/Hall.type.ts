import { RoomStatusEnum } from '@src/enums';

export interface IHall {
  id?: any;
  name: string;
  description: string;
  amount: number;
  maxPax: number;
  status: RoomStatusEnum;
  created?: Date;
  updated?: Date | null;
  deleted?: Date | null;
}
