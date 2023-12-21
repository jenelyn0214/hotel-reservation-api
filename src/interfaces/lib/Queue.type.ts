import { QueueStatusEnum } from '@src/enums';

export interface IQueue {
  id?: any;
  number: string;
  status: QueueStatusEnum;
  created?: Date;
  updated?: Date | null;
  deleted?: Date | null;
}
