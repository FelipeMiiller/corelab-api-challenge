import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './ioC/app.module';
import { ConfigService } from '@nestjs/config';
import { AllExceptionsFilter } from './common/middlewares/exception.filter';
import { LoggerService } from './common/loggers/logger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const env = app.get(ConfigService).get('app');
  const logger = new LoggerService();
  logger.contextName = bootstrap.name;
  app.enableCors({ origin: env.origin });

  const configSwagger = new DocumentBuilder().setTitle('corelab-api-challenge').setVersion('1.0').build();
  const document = SwaggerModule.createDocument(app, configSwagger);
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );
  app.useGlobalFilters(new AllExceptionsFilter());
  app.enableShutdownHooks();

  await app.listen(env.port);
  logger.info(`Application is running on port ${env.port}`);
}
bootstrap();
