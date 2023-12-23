"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomBookingSchema = void 0;
const mongoose_1 = require("mongoose");
const schema_1 = require("../util/schema");
const RoomBookingSchemaFields = {
    customerId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Customer' },
    roomId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Room' },
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
const RoomBookingSchema = new mongoose_1.Schema(RoomBookingSchemaFields);
exports.RoomBookingSchema = RoomBookingSchema;
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
RoomBookingSchema.set('toJSON', schema_1.toJSONCallback);
//# sourceMappingURL=room-booking.schema.js.map