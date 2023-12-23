"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toReadableFormat = exports.capitalizeFirstLetter = void 0;
function capitalizeFirstLetter(str) {
    return str
        ? str.charAt(0).toUpperCase() + str.slice(1).toLocaleLowerCase()
        : str;
}
exports.capitalizeFirstLetter = capitalizeFirstLetter;
function toReadableFormat(enumValue, capitalizeFirstWordOnly = true) {
    if (!enumValue) {
        return '';
    }
    let spacedValue = enumValue.replace(/([a-z])([A-Z])/g, '$1 $2');
    spacedValue = spacedValue.replace(/_/g, ' ');
    if (!capitalizeFirstWordOnly) {
        spacedValue = spacedValue
            .split(' ')
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    }
    else {
        let firstWord = capitalizeFirstLetter(spacedValue.substr(0, spacedValue.indexOf(' ')));
        firstWord = firstWord.charAt(0).toUpperCase() + firstWord.slice(1);
        spacedValue = firstWord.trim()
            ? firstWord + spacedValue.substr(spacedValue.indexOf(' '))
            : capitalizeFirstLetter(spacedValue);
    }
    return spacedValue;
}
exports.toReadableFormat = toReadableFormat;
//# sourceMappingURL=string-util.js.map