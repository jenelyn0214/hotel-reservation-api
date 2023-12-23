"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toJSONCallback = void 0;
const checkKeys = (item) => {
    Object.keys(item).forEach((itemKey) => {
        if (itemKey.includes('Id') &&
            typeof item[itemKey] === 'object' &&
            !Array.isArray(item[itemKey]) &&
            item[itemKey]) {
            item[itemKey] = item[itemKey].toString();
        }
        if (item._id) {
            item.id = item._id.toString();
            delete item._id;
        }
    });
    return item;
};
exports.toJSONCallback = {
    virtuals: true,
    transform: (document, returnedObject) => {
        returnedObject = checkKeys(returnedObject);
        delete returnedObject._id;
        delete returnedObject.__v;
        Object.keys(returnedObject).forEach((key) => {
            if (Array.isArray(returnedObject[key])) {
                returnedObject[key].map((item) => {
                    return checkKeys(item);
                });
            }
        });
    },
};
//# sourceMappingURL=schema.js.map