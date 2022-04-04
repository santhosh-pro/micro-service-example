import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { json } from 'express';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(
    json({ type: ['application/json', 'application/cloudevents+json'] }),
  );
  const options = new DocumentBuilder()
    .setTitle('Base Nesjs API Documentation')
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  const titleOptions = {
    swaggerOptions: {
      persistAuthorization: true,
    },
  };
  SwaggerModule.setup('docs', app, document, titleOptions);
  await app.listen(3002);
}
bootstrap();
