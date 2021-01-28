import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { ValidationException } from '../exception/validation.exception';

@Catch(ValidationException)
export class ValidationExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger('ValidationExceptionFilter');

  catch(exception: ValidationException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    this.logger.error(
      `Catch validation exception at ${request.method} ${request.url}`,
    );

    this.logger.error('Exception: ', JSON.stringify(exception));

    const errorResponse = {
      message: exception.message,
      details: exception.errors,
    };

    response.status(HttpStatus.BAD_REQUEST);
    response.header('Content-Type', 'application/json; charset=utf-8');
    response.send(errorResponse);
  }
}
