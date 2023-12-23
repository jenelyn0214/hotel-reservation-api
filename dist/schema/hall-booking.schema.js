"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HallBookingSchema = void 0;
const mongoose_1 = require("mongoose");
const schema_1 = require("../util/schema");
const HallBookingSchemaFields = {
    customerId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Customer' },
    hallId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Hall' },
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
const HallBookingSchema = new mongoose_1.Schema(HallBookingSchemaFields);
exports.HallBookingSchema = HallBookingSchema;
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
HallBookingSchema.set('toJSON', schema_1.toJSONCallback);
//# sourceMappingURL=hall-booking.schema.js.map