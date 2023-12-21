import { Document, Schema } from 'mongoose';

import { IBookingService } from '@src/interfaces';
import { toJSONCallback } from '@src/util/schema';

interface IBookingServiceDoc extends IBookingService, Document {}

const BookingServiceSchemaFields: Record<
  keyof Omit<IBookingService, 'id' | 'roomBooking' | 'service'>,
  any
> = {
  roomBookingId: { type: Schema.Types.ObjectId, ref: 'RoomBooking' },
  serviceId: { type: Schema.Types.ObjectId, ref: 'Service' },
  qty: Number,
  price: Number,
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

const BookingServiceSchema = new Schema(BookingServiceSchemaFields);

BookingServiceSchema.virtual('roomBooking', {
  ref: 'RoomBooking',
  localField: 'roomBookingId',
  foreignField: '_id',
  justOne: true,
});

BookingServiceSchema.virtual('service', {
  ref: 'Service',
  localField: 'serviceId',
  foreignField: '_id',
  justOne: true,
});

BookingServiceSchema.pre(/^find/, function () {
  this.populate(['roomBooking', 'service']);
});

BookingServiceSchema.set('toJSON', toJSONCallback);

export { BookingServiceSchema, IBookingServiceDoc };
