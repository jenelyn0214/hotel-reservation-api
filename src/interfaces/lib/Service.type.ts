import { ServiceTypeEnum } from '@src/enums/lib/Service.enum';

export interface IService {
  id?: any;
  name: string;
  type: ServiceTypeEnum;
  price: number;
  created?: Date;
  updated?: Date | null;
  deleted?: Date | null;
}
