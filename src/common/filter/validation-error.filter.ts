import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { ValidationException } from '../exception/validation.exception';
import { Logger } from '../utils/logger';

@Catch(ValidationException)
export class ValidationErrorFilter implements ExceptionFilter {
  catch(exception: ValidationException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    Logger.error(
      `Catch validation exception at ${request.method} ${request.url}`,
    );

    Logger.error('exception', JSON.stringify(exception));

    const errorResponse = {
      message: exception.message,
      details: exception.errors,
    };

    response.status(HttpStatus.BAD_REQUEST);
    response.header('Content-Type', 'application/json; charset=utf-8');
    response.send(errorResponse);
  }
}
