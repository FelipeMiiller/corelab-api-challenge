import { NestFactory } from '@nestjs/core';
<<<<<<< HEAD
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import config from './common/constants/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule, { logger: ['error', 'warn', 'log'] });
  app.enableCors({ origin: config.app.origin });
=======

import { Logger, ValidationPipe } from '@nestjs/common';

import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './ioC/app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule, { logger: ['error', 'warn', 'log'] });
  const env = app.get(ConfigService).get('app');

  app.enableCors({ origin: env.origin });
>>>>>>> 8192f77 (refactory: docker end database connection)

  const configSwagger = new DocumentBuilder().setTitle('corelab-api-challenge').setVersion('1.0').build();
  const document = SwaggerModule.createDocument(app, configSwagger);
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );
  app.enableShutdownHooks();
<<<<<<< HEAD
  await app.listen(config.app.port);
  logger.log(`Application is running on port ${config.app.port}`);
=======
  await app.listen(env.port);
  logger.log(`Application is running on port ${env.port}`);
>>>>>>> 8192f77 (refactory: docker end database connection)
}
bootstrap();
