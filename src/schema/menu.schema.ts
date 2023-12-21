import { Document, Schema } from 'mongoose';

import { IMenu } from '@src/interfaces';
import { toJSONCallback } from '@src/util/schema';

interface IMenuDoc extends IMenu, Document {}

const MenuSchemaFields: Record<keyof Omit<IMenu, 'id'>, any> = {
  name: String,
  price: Number,
  status: String,
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

const MenuSchema = new Schema(MenuSchemaFields);

MenuSchema.set('toJSON', toJSONCallback);

export { MenuSchema, IMenuDoc };
