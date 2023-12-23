"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path = __importStar(require("path"));
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
const express_1 = require("express");
const moduleAlias = __importStar(require("module-alias"));
const app_module_1 = require("./app.module");
const common_config_1 = __importDefault(require("./config/common.config"));
moduleAlias.addAliases({
    '@src': path.resolve(__dirname),
});
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const globalPrefix = 'api/v1';
    app.use((0, express_1.json)({ limit: '4mb' }));
    app.setGlobalPrefix(globalPrefix, {
        exclude: ['health', '/_ah/warmup', '/webconfig'],
    });
    const config = app.get(common_config_1.default.KEY);
    let corsConfig = {};
    if (config.isProduction) {
        corsConfig = {
            credentials: true,
            exposedHeaders: ['accesstoken', 'content-disposition'],
        };
    }
    if (config.enableSwagger) {
        const openAPIOptions = new swagger_1.DocumentBuilder()
            .setTitle(process.env.API_TITLE)
            .setDescription(process.env.API_DESCRIPTION)
            .setVersion(process.env.API_VERSION)
            .build();
        const openAPIDocument = swagger_1.SwaggerModule.createDocument(app, openAPIOptions);
        swagger_1.SwaggerModule.setup('api-docs', app, openAPIDocument);
    }
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
    }));
    app.enableCors(corsConfig);
    await app.listen(config.port);
}
bootstrap();
//# sourceMappingURL=main.js.map