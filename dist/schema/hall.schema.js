"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HallSchema = void 0;
const mongoose_1 = require("mongoose");
const schema_1 = require("../util/schema");
const HallSchemaFields = {
    name: String,
    description: String,
    price: Number,
    maxPax: Number,
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
const HallSchema = new mongoose_1.Schema(HallSchemaFields);
exports.HallSchema = HallSchema;
HallSchema.set('toJSON', schema_1.toJSONCallback);
//# sourceMappingURL=hall.schema.js.map