import { Document, Schema } from 'mongoose';

import { IHall } from '@src/interfaces';
import { toJSONCallback } from '@src/util/schema';

interface IHallDoc extends IHall, Document {}

const HallSchemaFields: Record<keyof Omit<IHall, 'id'>, any> = {
  name: String,
  description: String,
  price: Number,
  maxPax: Number,
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

const HallSchema = new Schema(HallSchemaFields);

HallSchema.set('toJSON', toJSONCallback);

export { HallSchema, IHallDoc };
