"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPhotoId = void 0;
const getPhotoId = (photoLink) => {
    var _a;
    if (!photoLink.includes('image/upload/'))
        return photoLink;
    const photoNameSplit = photoLink.split('image/upload/');
    return (_a = photoNameSplit[1]) !== null && _a !== void 0 ? _a : '';
};
exports.getPhotoId = getPhotoId;
//# sourceMappingURL=file-util.js.map