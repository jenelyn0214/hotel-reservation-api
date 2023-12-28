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
const fs_1 = require("fs");
const path = __importStar(require("path"));
const path_1 = require("path");
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
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
    const openAPIOptions = new swagger_1.DocumentBuilder()
        .setTitle('LNU Hotel API')
        .setDescription('Backend APIs of hotel reservation')
        .setVersion('1.0')
        .setBasePath('api/v1')
        .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' })
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, openAPIOptions);
    swagger_1.SwaggerModule.setup('api-docs', app, document, {
        customSiteTitle: 'Backend Generator',
        customfavIcon: 'https://avatars.githubusercontent.com/u/6936373?s=200&v=4',
        customJs: [
            'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-bundle.min.js',
            'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.min.js',
        ],
        customCssUrl: [
            'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.min.css',
            'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.min.css',
            'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.css',
        ],
    });
    const cors = Object.assign({}, corsConfig);
    app.enableCors(cors);
    app.useGlobalPipes(new common_1.ValidationPipe({ whitelist: true }));
    app.setGlobalPrefix('api/v1');
    (0, class_validator_1.useContainer)(app.select(app_module_1.AppModule), { fallbackOnErrors: true });
    await app.listen(config.port);
    if (!config.isProduction) {
        const pathToSwaggerStaticFolder = (0, path_1.resolve)(process.cwd(), 'swagger-static');
        const pathToSwaggerJson = (0, path_1.resolve)(pathToSwaggerStaticFolder, 'swagger.json');
        const swaggerJson = JSON.stringify(document, null, 2);
        (0, fs_1.writeFileSync)(pathToSwaggerJson, swaggerJson);
        console.log(`Swagger JSON file written to: '/swagger-static/swagger.json'`);
    }
}
bootstrap();
//# sourceMappingURL=main.js.map