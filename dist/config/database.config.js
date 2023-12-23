"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("@nestjs/config");
exports.default = (0, config_1.registerAs)('database', () => ({
    databaseURI: process.env.MONGODB_URI || '',
}));
//# sourceMappingURL=database.config.js.map