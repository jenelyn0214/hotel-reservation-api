import { IMenu } from './Menu.type';
import { IOrder } from './Order.type';

export interface IOrderMenu {
  id?: any;
  orderId: string;
  order: IOrder;
  menuId: string;
  menu: IMenu;
  qty: number;
  created?: Date;
  updated?: Date | null;
  deleted?: Date | null;
}
