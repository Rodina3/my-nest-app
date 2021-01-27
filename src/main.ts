import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from './common/pipe/validation.pipe';
import { ValidationErrorFilter } from './common/filter/validation-error.filter';
import { HttpErrorException } from './common/filter/http-error.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { logger } from './common/middleware/logger.middleware';
import { Logger } from './common/utils/logger';
import { ConfigService } from '@nestjs/config';

async function initSwagger(app, appConfig, swaggerConfig) {
  const options = new DocumentBuilder()
    .setTitle(appConfig.name)
    .setDescription(`${appConfig.name} API documents`)
    .setVersion('0.0.1')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup(swaggerConfig.path, app, document);
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const appConfig = configService.get('app');
  const swaggerConfig = configService.get('swagger');

  await initSwagger(app, appConfig, swaggerConfig);

  app.use(logger);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new ValidationErrorFilter());
  app.useGlobalFilters(new HttpErrorException());

  await app.listen(appConfig.port, appConfig.host, () => {
    Logger.log(
      `${appConfig.name} server has been started on ${appConfig.host}:${appConfig.port}`,
    );
  });
}
bootstrap();
