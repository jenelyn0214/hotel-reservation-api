import { Document, Schema } from 'mongoose';

import { IRoomBooking } from '@src/interfaces';
import { toJSONCallback } from '@src/util/schema';

interface IRoomBookingDoc extends IRoomBooking, Document {}

const RoomBookingSchemaFields: Record<
  keyof Omit<IRoomBooking, 'id' | 'customer' | 'room'>,
  any
> = {
  customerId: { type: Schema.Types.ObjectId, ref: 'Customer' },
  roomId: { type: Schema.Types.ObjectId, ref: 'Room' },
  startDate: Date,
  endDate: Date,
  paxCount: Number,
  adultCount: Number,
  childCount: Number,
  seniorCount: Number,
  subTotalAmount: Number,
  discountAmount: Number,
  totalAmount: Number,
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

const RoomBookingSchema = new Schema(RoomBookingSchemaFields);

RoomBookingSchema.virtual('customer', {
  ref: 'Customer',
  localField: 'customerId',
  foreignField: '_id',
  justOne: true,
});

RoomBookingSchema.virtual('room', {
  ref: 'Room',
  localField: 'roomId',
  foreignField: '_id',
  justOne: true,
});

RoomBookingSchema.pre(/^find/, function () {
  this.populate(['customer', 'room']);
});

RoomBookingSchema.set('toJSON', toJSONCallback);

export { RoomBookingSchema, IRoomBookingDoc };
