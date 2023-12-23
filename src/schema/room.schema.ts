import { Document, Schema } from 'mongoose';

import { IRoom } from '@src/interfaces';
import { toJSONCallback } from '@src/util/schema';

interface IRoomDoc extends IRoom, Document {}

const RoomSchemaFields: Record<keyof Omit<IRoom, 'id' | 'roomType'>, any> = {
  number: String,
  roomTypeId: { type: Schema.Types.ObjectId, ref: 'RoomType' },
  price: Number,
  maxPax: Number,
  status: String,
  created: {
    type: Date,
    default: Date.now,
  },
  deleted: {
    type: Date,
    default: null,
  },
  updated: {
    type: Date,
    default: null,
  },
};

const RoomSchema = new Schema(RoomSchemaFields);

RoomSchema.virtual('roomType', {
  ref: 'Customer',
  localField: 'roomTypeId',
  foreignField: '_id',
  justOne: true,
});

RoomSchema.pre(/^find/, function () {
  this.populate(['roomType']);
});

RoomSchema.set('toJSON', toJSONCallback);

export { IRoomDoc, RoomSchema };
