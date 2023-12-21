import { Document, Schema } from 'mongoose';

import { IOrder } from '@src/interfaces';
import { toJSONCallback } from '@src/util/schema';

interface IOrderDoc extends IOrder, Document {}

const OrderSchemaFields: Record<
  keyof Omit<IOrder, 'id' | 'roomBooking' | 'room'>,
  any
> = {
  paxCount: Number,
  seniorCount: Number,
  subTotalAmount: Number,
  totalQty: Number,
  discountAmount: Number,
  totalAmount: Number,
  paymentType: String,
  roomBookingId: { type: Schema.Types.ObjectId, ref: 'RoomBooking' },
  roomId: { type: Schema.Types.ObjectId, ref: 'Room' },
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

const OrderSchema = new Schema(OrderSchemaFields);

OrderSchema.virtual('roomBooking', {
  ref: 'RoomBooking',
  localField: 'roomBookingId',
  foreignField: '_id',
  justOne: true,
});

OrderSchema.virtual('room', {
  ref: 'Room',
  localField: 'roomId',
  foreignField: '_id',
  justOne: true,
});

OrderSchema.pre(/^find/, function () {
  this.populate(['roomBooking', 'room']);
});

OrderSchema.set('toJSON', toJSONCallback);

export { OrderSchema, IOrderDoc };
