import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import config from './util/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule, { logger: ['error', 'warn', 'log'] });
  app.enableCors({ origin: config.app.origin });

  const configSwagger = new DocumentBuilder().setTitle('corelab-api-challenge').setVersion('1.0').addTag('api').build();
  const document = SwaggerModule.createDocument(app, configSwagger);
  SwaggerModule.setup('api', app, document);

  app.enableShutdownHooks();
  await app.listen(config.app.port);
  logger.log(`Application is running on port ${config.app.port}`);
}
bootstrap();
