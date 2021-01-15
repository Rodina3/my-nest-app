import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from './common/pipe/validation.pipe';
import { ValidationErrorFilter } from './common/filter/validation-error.filter';
import { HttpErrorException } from './common/filter/http-error.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function initSwagger(app) {
  const options = new DocumentBuilder()
    .setTitle('my-nest-app')
    .setDescription('The my-nest-app API documents')
    .setVersion('0.0.1')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-docs', app, document);
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  await initSwagger(app);

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new ValidationErrorFilter());
  app.useGlobalFilters(new HttpErrorException());

  await app.listen(3000);
}
bootstrap();
