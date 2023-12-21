import * as path from 'path';

import { ValidationPipe } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
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
  } else {
    const openAPIOptions = new DocumentBuilder()
      .setTitle(process.env.API_TITLE)
      .setDescription(process.env.API_DESCRIPTION)
      .setVersion(process.env.API_VERSION)
      .build();

    const openAPIDocument = SwaggerModule.createDocument(app, openAPIOptions);
    SwaggerModule.setup('api-docs', app, openAPIDocument);
  }

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  app.enableCors(corsConfig);
  await app.listen(config.port);
}
bootstrap();
