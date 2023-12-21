import { Document, Schema } from 'mongoose';

import { IQueue } from '@src/interfaces';
import { toJSONCallback } from '@src/util/schema';

interface IQueueDoc extends IQueue, Document {}

const QueueSchemaFields: Record<keyof Omit<IQueue, 'id'>, any> = {
  number: String,
  status: String,
  created: {
    type: Date,
    default: Date.now,
  },
  updated: {
    type: Date,
    default: Date.now,
  },
  deleted: {
    type: Date,
    default: null,
  },
};

const QueueSchema = new Schema(QueueSchemaFields);

QueueSchema.set('toJSON', toJSONCallback);

export { QueueSchema, IQueueDoc };
