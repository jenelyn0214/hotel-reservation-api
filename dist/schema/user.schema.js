"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSchema = void 0;
const mongoose_1 = require("mongoose");
const schema_1 = require("../util/schema");
const UserSchemaFields = {
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
    username: {
        type: String,
        unique: true,
    },
    password: String,
    type: String,
    refreshToken: {
        type: String,
        default: null,
    },
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
const UserSchema = new mongoose_1.Schema(UserSchemaFields);
exports.UserSchema = UserSchema;
UserSchema.set('toJSON', schema_1.toJSONCallback);
//# sourceMappingURL=user.schema.js.map