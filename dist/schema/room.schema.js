"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomSchema = void 0;
const mongoose_1 = require("mongoose");
const schema_1 = require("../util/schema");
const RoomSchemaFields = {
    number: String,
    roomTypeId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'RoomType' },
    price: Number,
    maxPax: Number,
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
const RoomSchema = new mongoose_1.Schema(RoomSchemaFields);
exports.RoomSchema = RoomSchema;
RoomSchema.virtual('roomType', {
    ref: 'Customer',
    localField: 'roomTypeId',
    foreignField: '_id',
    justOne: true,
});
RoomSchema.pre(/^find/, function () {
    this.populate(['roomType']);
});
RoomSchema.set('toJSON', schema_1.toJSONCallback);
//# sourceMappingURL=room.schema.js.map