import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from './common/pipe/validation.pipe';
import { ValidationExceptionFilter } from './common/filter/validation-exception.filter';
import { HttpExceptionFilter } from './common/filter/http-exception.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
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
  const app = await NestFactory.create(AppModule, {
    // Further customize logger as documentation at https://docs.nestjs.com/techniques/logger
    logger: ['error', 'warn', 'log', 'debug', 'verbose'],
  });
  const configService = app.get(ConfigService);
  const appConfig = configService.get('app');
  const swaggerConfig = configService.get('swagger');

  await initSwagger(app, appConfig, swaggerConfig);

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(
    new ValidationExceptionFilter(),
    new HttpExceptionFilter(),
  );
  // Register pipes, filters, guards in here cannot inject dependencies
  // since this is done outside the context of any module.

  await app.listen(appConfig.port, appConfig.host);
}
bootstrap();
