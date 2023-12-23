"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toPlainObject = exports.parseBoolean = void 0;
const common_1 = require("@nestjs/common");
function parseBoolean(value, propertyName) {
    if (typeof value === 'string') {
        if (value === 'true') {
            return true;
        }
        else if (value === 'false') {
            return false;
        }
        else {
            throw new common_1.ForbiddenException(`${propertyName} must be either true or false`);
        }
    }
    else {
        return value;
    }
}
exports.parseBoolean = parseBoolean;
function toPlainObject(mongooseObj) {
    return Object.assign({}, mongooseObj.toJSON());
}
exports.toPlainObject = toPlainObject;
//# sourceMappingURL=dto-util.js.map