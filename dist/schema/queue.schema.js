"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueueSchema = void 0;
const mongoose_1 = require("mongoose");
const schema_1 = require("../util/schema");
const QueueSchemaFields = {
    number: String,
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
const QueueSchema = new mongoose_1.Schema(QueueSchemaFields);
exports.QueueSchema = QueueSchema;
QueueSchema.set('toJSON', schema_1.toJSONCallback);
//# sourceMappingURL=queue.schema.js.map