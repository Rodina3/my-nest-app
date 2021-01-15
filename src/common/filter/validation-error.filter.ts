import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { ValidationException } from '../../feature/exception/validation.exception';

@Catch(ValidationException)
export class ValidationErrorFilter implements ExceptionFilter {
  catch(exception: ValidationException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    const errorResponse = {
      message: exception.message,
      details: exception.errors,
    };

    response.status(HttpStatus.BAD_REQUEST);
    response.header('Content-Type', 'application/json; charset=utf-8');
    response.send(errorResponse);
  }
}
