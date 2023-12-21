import { Document, Schema } from 'mongoose';

import { IHallBooking } from '@src/interfaces';
import { toJSONCallback } from '@src/util/schema';

interface IHallBookingDoc extends IHallBooking, Document {}

const HallBookingSchemaFields: Record<
  keyof Omit<IHallBooking, 'id' | 'customer' | 'hall'>,
  any
> = {
  customerId: { type: Schema.Types.ObjectId, ref: 'Customer' },
  hallId: { type: Schema.Types.ObjectId, ref: 'Hall' },
  startDate: Date,
  endDate: Date,
  paxCount: Number,
  amount: Number,
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

const HallBookingSchema = new Schema(HallBookingSchemaFields);

HallBookingSchema.virtual('customer', {
  ref: 'Customer',
  localField: 'customerId',
  foreignField: '_id',
  justOne: true,
});

HallBookingSchema.virtual('hall', {
  ref: 'Hall',
  localField: 'hallId',
  foreignField: '_id',
  justOne: true,
});

HallBookingSchema.pre(/^find/, function () {
  this.populate(['customer', 'hall']);
});

HallBookingSchema.set('toJSON', toJSONCallback);

export { HallBookingSchema, IHallBookingDoc };
