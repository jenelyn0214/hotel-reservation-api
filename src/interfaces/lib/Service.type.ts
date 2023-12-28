import { ServiceTypeEnum } from '@src/enums';

export interface IService {
  id?: any;
  name: string;
  type: ServiceTypeEnum;
  price: number;
  created?: Date;
  updated?: Date | null;
  deleted?: Date | null;
}
