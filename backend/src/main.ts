import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { useContainer } from 'class-validator';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const origins = process.env.CORS_ORIGINS?.split(',');
  app.enableCors({ origin: origins, credentials: true });

  app.use(cookieParser());

  const config = new DocumentBuilder()
    .setTitle('API docs')
    .setDescription('API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/api-docs', app, document, {
    jsonDocumentUrl: 'api/api-docs-json',
  });

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  await app.listen(process.env.APP_PORT ?? 3000);
}
bootstrap();
