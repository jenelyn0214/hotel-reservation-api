"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomTypeSchema = void 0;
const mongoose_1 = require("mongoose");
const schema_1 = require("../util/schema");
const RoomTypeSchemaFields = {
    name: String,
    price: Number,
    maxPax: Number,
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
const RoomTypeSchema = new mongoose_1.Schema(RoomTypeSchemaFields);
exports.RoomTypeSchema = RoomTypeSchema;
RoomTypeSchema.set('toJSON', schema_1.toJSONCallback);
//# sourceMappingURL=room-type.schema.js.map