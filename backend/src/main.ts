import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as bodyParser from 'body-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Set the limit for JSON payloads
  app.use(bodyParser.json({ limit: '50mb' }));
  // Set the limit for URL-encoded payloads
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  app.enableCors({
    origin: ['http://localhost:4200', 'https://beta.atticadt.uwmh.eu'],
    preflightContinue: true,
  });

  const config = new DocumentBuilder()
    .setTitle('Digital Twins of Athens API')
    .setDescription('API description')
    .setVersion('1.0')
    .addTag('API')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const port = process.env.PORT || 3335;
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`,
  );
}
bootstrap();
