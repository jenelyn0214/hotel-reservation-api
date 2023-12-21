import { Document, Schema } from 'mongoose';

import { IOrderMenu } from '@src/interfaces';
import { toJSONCallback } from '@src/util/schema';

interface IOrderMenuDoc extends IOrderMenu, Document {}

const OrderMenuSchemaFields: Record<
  keyof Omit<IOrderMenu, 'id' | 'order' | 'menu'>,
  any
> = {
  orderId: { type: Schema.Types.ObjectId, ref: 'Order' },
  menuId: { type: Schema.Types.ObjectId, ref: 'Menu' },
  qty: Number,
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

const OrderMenuSchema = new Schema(OrderMenuSchemaFields);

OrderMenuSchema.virtual('order', {
  ref: 'Order',
  localField: 'orderId',
  foreignField: '_id',
  justOne: true,
});

OrderMenuSchema.virtual('menu', {
  ref: 'Menu',
  localField: 'menuId',
  foreignField: '_id',
  justOne: true,
});

OrderMenuSchema.pre(/^find/, function () {
  this.populate(['order', 'menu']);
});

OrderMenuSchema.set('toJSON', toJSONCallback);

export { OrderMenuSchema, IOrderMenuDoc };
