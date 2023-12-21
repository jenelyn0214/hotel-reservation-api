import { Document, Schema } from 'mongoose';

import { IUser } from '@src/interfaces';
import { toJSONCallback } from '@src/util/schema';

interface IUserDoc extends IUser, Document {}

const UserSchemaFields: Record<keyof Omit<IUser, 'id'>, any> = {
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
  username: {
    type: String,
    unique: true,
  },
  password: String,
  type: String,
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

const UserSchema = new Schema(UserSchemaFields);

UserSchema.set('toJSON', toJSONCallback);

export { UserSchema, IUserDoc };
