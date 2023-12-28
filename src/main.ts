import { writeFileSync } from 'fs';
import * as path from 'path';
import { resolve } from 'path';

import { ValidationPipe } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { useContainer } from 'class-validator';
import { json } from 'express';
import * as moduleAlias from 'module-alias';

import { AppModule } from '@src/app.module';
import commonConfig from '@src/config/common.config';

moduleAlias.addAliases({
  '@src': path.resolve(__dirname),
});

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api/v1';

  app.use(json({ limit: '4mb' }));

  app.setGlobalPrefix(globalPrefix, {
    exclude: ['health', '/_ah/warmup', '/webconfig'],
  });

  const config: ConfigType<typeof commonConfig> = app.get(commonConfig.KEY);
  let corsConfig = {};

  if (config.isProduction) {
    corsConfig = {
      credentials: true,
      exposedHeaders: ['accesstoken', 'content-disposition'],
      // origin: config.accessControlOriginUrls,
    };
  }

  const openAPIOptions = new DocumentBuilder()
    .setTitle('LNU Hotel API')
    .setDescription('Backend APIs of hotel reservation')
    .setVersion('1.0')
    .setBasePath('api/v1')
    .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' })
    .build();

  const document = SwaggerModule.createDocument(app, openAPIOptions);
  SwaggerModule.setup('api-docs', app, document, {
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
  const cors = { ...corsConfig };
  app.enableCors(cors);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.setGlobalPrefix('api/v1');
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  await app.listen(config.port);

  if (!config.isProduction) {
    const pathToSwaggerStaticFolder = resolve(process.cwd(), 'swagger-static');

    // write swagger json file
    const pathToSwaggerJson = resolve(
      pathToSwaggerStaticFolder,
      'swagger.json',
    );
    const swaggerJson = JSON.stringify(document, null, 2);
    writeFileSync(pathToSwaggerJson, swaggerJson);
    console.log(`Swagger JSON file written to: '/swagger-static/swagger.json'`);
  }
}
bootstrap();
