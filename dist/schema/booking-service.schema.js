"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingServiceSchema = void 0;
const mongoose_1 = require("mongoose");
const schema_1 = require("../util/schema");
const BookingServiceSchemaFields = {
    roomBookingId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'RoomBooking' },
    serviceId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Service' },
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
const BookingServiceSchema = new mongoose_1.Schema(BookingServiceSchemaFields);
exports.BookingServiceSchema = BookingServiceSchema;
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
BookingServiceSchema.set('toJSON', schema_1.toJSONCallback);
//# sourceMappingURL=booking-service.schema.js.map