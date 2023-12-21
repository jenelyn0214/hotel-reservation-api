import { Document, Schema } from 'mongoose';

import { IRoom } from '@src/interfaces';
import { toJSONCallback } from '@src/util/schema';

interface IRoomDoc extends IRoom, Document {}

const RoomSchemaFields: Record<
  keyof Omit<IRoom, 'id' | 'roomType' | 'roomBooking'>,
  any
> = {
  number: String,
  roomTypeId: { type: Schema.Types.ObjectId, ref: 'RoomType' },
  roomBookingId: { type: Schema.Types.ObjectId, ref: 'RoomBooking' },
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

RoomSchema.virtual('roomBooking', {
  ref: 'RoomBooking',
  localField: 'roomBookingId',
  foreignField: '_id',
  justOne: true,
});

RoomSchema.pre(/^find/, function () {
  this.populate(['roomType', 'roomBooking']);
});

RoomSchema.set('toJSON', toJSONCallback);

export { RoomSchema, IRoomDoc };
