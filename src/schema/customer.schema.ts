import { Document, Schema } from 'mongoose';

import { ICustomer } from '@src/interfaces';
import { toJSONCallback } from '@src/util/schema';

interface ICustomerDoc extends ICustomer, Document {}

const CustomerSchemaFields: Record<keyof Omit<ICustomer, 'id'>, any> = {
  firstName: String,
  lastName: String,
  middleName: {
    type: String,
    default: null,
  },
  fullName: {
    type: String,
    default: null,
  },
  email: {
    type: String,
    unique: true,
  },
  gender: String,
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

const CustomerSchema = new Schema(CustomerSchemaFields);

CustomerSchema.set('toJSON', toJSONCallback);

export { CustomerSchema, ICustomerDoc };
