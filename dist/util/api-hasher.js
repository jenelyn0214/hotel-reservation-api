"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateAPIHash = exports.generateAPIHash = void 0;
const crypto_js_1 = require("crypto-js");
const cleanData = (hasherData) => {
    const params = Object.entries(hasherData.params)
        .sort(([keyA], [keyB]) => keyA.localeCompare(keyB))
        .reduce((newObj, [key, value]) => {
        const isArray = key.includes('[]');
        const newKey = key.replace(/\[\]/g, '');
        newObj[newKey] = isArray && !Array.isArray(value) ? [value] : value;
        return newObj;
    }, {});
    const data = Object.entries(hasherData.data)
        .sort(([keyA], [keyB]) => keyA.localeCompare(keyB))
        .reduce((newObj, [key, value]) => {
        const isArray = key.includes('[]');
        const newKey = key.replace(/\[\]/g, '');
        newObj[newKey] = isArray && !Array.isArray(value) ? [value] : value;
        return newObj;
    }, {});
    return {
        apiKey: hasherData.apiKey,
        data,
        params,
    };
};
const generateAPIHash = (data) => {
    const cleanedData = cleanData(data);
    const objectString = JSON.stringify(cleanedData);
    return (0, crypto_js_1.SHA256)(objectString).toString();
};
exports.generateAPIHash = generateAPIHash;
const validateAPIHash = (data, apiHash) => {
    const cleanedString = cleanData(data);
    const objectString = JSON.stringify(cleanedString);
    const hashedString = (0, crypto_js_1.SHA256)(objectString).toString();
    console.log('validateAPIHash', hashedString, cleanedString, data, apiHash);
    return hashedString === apiHash;
};
exports.validateAPIHash = validateAPIHash;
//# sourceMappingURL=api-hasher.js.map