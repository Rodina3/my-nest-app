import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from './common/pipe/validation.pipe';
import { ValidationErrorFilter } from './common/filter/validation-error.filter';
import { HttpErrorException } from './common/filter/http-error.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new ValidationErrorFilter());
  app.useGlobalFilters(new HttpErrorException());

  await app.listen(3000);
}
bootstrap();
