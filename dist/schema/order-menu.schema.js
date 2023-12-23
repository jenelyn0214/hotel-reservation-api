"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderMenuSchema = void 0;
const mongoose_1 = require("mongoose");
const schema_1 = require("../util/schema");
const OrderMenuSchemaFields = {
    orderId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Order' },
    menuId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Menu' },
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
const OrderMenuSchema = new mongoose_1.Schema(OrderMenuSchemaFields);
exports.OrderMenuSchema = OrderMenuSchema;
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
OrderMenuSchema.set('toJSON', schema_1.toJSONCallback);
//# sourceMappingURL=order-menu.schema.js.map