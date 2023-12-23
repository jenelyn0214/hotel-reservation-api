"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceSchema = void 0;
const mongoose_1 = require("mongoose");
const schema_1 = require("../util/schema");
const ServiceSchemaFields = {
    name: String,
    type: String,
    price: Number,
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
const ServiceSchema = new mongoose_1.Schema(ServiceSchemaFields);
exports.ServiceSchema = ServiceSchema;
ServiceSchema.set('toJSON', schema_1.toJSONCallback);
//# sourceMappingURL=service.schema.js.map