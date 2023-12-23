"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MenuSchema = void 0;
const mongoose_1 = require("mongoose");
const schema_1 = require("../util/schema");
const MenuSchemaFields = {
    name: String,
    price: Number,
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
const MenuSchema = new mongoose_1.Schema(MenuSchemaFields);
exports.MenuSchema = MenuSchema;
MenuSchema.set('toJSON', schema_1.toJSONCallback);
//# sourceMappingURL=menu.schema.js.map