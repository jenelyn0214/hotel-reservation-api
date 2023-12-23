import { Document, Schema } from 'mongoose';

import { IRoomType } from '@src/interfaces';
import { toJSONCallback } from '@src/util/schema';

interface IRoomTypeDoc extends IRoomType, Document {}

const RoomTypeSchemaFields: Record<keyof Omit<IRoomType, 'id'>, any> = {
  name: String,
  price: Number,
  maxPax: Number,
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

const RoomTypeSchema = new Schema(RoomTypeSchemaFields);

RoomTypeSchema.set('toJSON', toJSONCallback);

export { IRoomTypeDoc, RoomTypeSchema };
