import { HallStatusEnum } from '@src/enums';

export interface IHall {
  id?: any;
  name: string;
  description: string;
  price: number;
  maxPax: number;
  status: HallStatusEnum;
  created?: Date;
  updated?: Date | null;
  deleted?: Date | null;
}
