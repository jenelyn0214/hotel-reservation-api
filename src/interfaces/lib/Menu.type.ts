import { MenuStatusEnum } from '@src/enums';

export interface IMenu {
  id?: any;
  name: string;
  price: number;
  status: MenuStatusEnum;
  created?: Date;
  updated?: Date | null;
  deleted?: Date | null;
}
