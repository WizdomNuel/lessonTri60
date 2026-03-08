import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { GlobalExceptionsFilter } from './common/filters/global-exception.filter';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import { winstonConfig } from './config/logger.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
    logger: winstonConfig,
  });

  // Security Headers
  app.use(helmet());

  // Global Configs
  app.setGlobalPrefix('api/v1');

  // Input Validation & Sanitization
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,         // strip unlisted properties
      forbidNonWhitelisted: true, // throw error if unlisted properties are found
      transform: true,         // transform payloads to DTO instances
    }),
  );

  // Global Responses and Exceptions
  app.useGlobalFilters(new GlobalExceptionsFilter());
  app.useGlobalInterceptors(new TransformInterceptor());

  // Start Server
  const port = process.env.PORT || 3001;
  await app.listen(port);
  console.log(`Backend Server running securely on port ${port}...`);
}
bootstrap();
