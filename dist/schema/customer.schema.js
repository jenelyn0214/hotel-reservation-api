"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerSchema = void 0;
const mongoose_1 = require("mongoose");
const schema_1 = require("../util/schema");
const CustomerSchemaFields = {
    firstName: String,
    lastName: String,
    middleName: {
        type: String,
        default: null,
    },
    fullName: {
        type: String,
        default: null,
    },
    email: {
        type: String,
        unique: true,
    },
    gender: String,
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
const CustomerSchema = new mongoose_1.Schema(CustomerSchemaFields);
exports.CustomerSchema = CustomerSchema;
CustomerSchema.set('toJSON', schema_1.toJSONCallback);
//# sourceMappingURL=customer.schema.js.map