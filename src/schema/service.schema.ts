import { Document, Schema } from 'mongoose';

import { IService } from '@src/interfaces';
import { toJSONCallback } from '@src/util/schema';

interface IServiceDoc extends IService, Document {}

const ServiceSchemaFields: Record<keyof Omit<IService, 'id'>, any> = {
  name: String,
  type: String,
  price: Number,
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

const ServiceSchema = new Schema(ServiceSchemaFields);

ServiceSchema.set('toJSON', toJSONCallback);

export { ServiceSchema, IServiceDoc };
