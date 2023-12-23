"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.comparePassword = exports.encryptPassword = void 0;
const bcryptjs_1 = require("bcryptjs");
const encryptPassword = (password) => {
    const salt = (0, bcryptjs_1.genSaltSync)(10);
    const passwordHashed = (0, bcryptjs_1.hashSync)(password, salt);
    return passwordHashed;
};
exports.encryptPassword = encryptPassword;
const comparePassword = (password, hashedPassword) => {
    const isCorrect = (0, bcryptjs_1.compareSync)(password, hashedPassword);
    return isCorrect;
};
exports.comparePassword = comparePassword;
//# sourceMappingURL=password.js.map