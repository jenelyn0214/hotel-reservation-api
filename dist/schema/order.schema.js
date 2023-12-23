"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderSchema = void 0;
const mongoose_1 = require("mongoose");
const schema_1 = require("../util/schema");
const OrderSchemaFields = {
    paxCount: Number,
    seniorCount: Number,
    subTotalAmount: Number,
    totalQty: Number,
    discountAmount: Number,
    totalAmount: Number,
    paymentType: String,
    roomBookingId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'RoomBooking' },
    roomId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Room' },
    queueId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Queue' },
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
const OrderSchema = new mongoose_1.Schema(OrderSchemaFields);
exports.OrderSchema = OrderSchema;
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
OrderSchema.set('toJSON', schema_1.toJSONCallback);
//# sourceMappingURL=order.schema.js.map