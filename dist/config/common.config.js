"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("@nestjs/config");
exports.default = (0, config_1.registerAs)('common', () => ({
    port: parseInt(process.env.PORT, 10) || 3333,
    isProduction: process.env.ENVIRONMENT === 'production' || false,
    apiKey: process.env.API_KEY || '',
    secured: process.env.SECURED || 'false',
    jwt: {
        accessTokenSecret: process.env.JWT_ACCESS_TOKEN_SECRET_KEY || '',
        refreshTokenSecret: process.env.JWT_REFRESH_TOKEN_SECRET_KEY || '',
    },
}));
//# sourceMappingURL=common.config.js.map