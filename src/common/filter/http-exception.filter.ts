import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Logger } from '../utils/logger';

@Catch(HttpException)
export class HttpErrorExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    let message: any = exception.message;
    let isDeepestMessage = false;
    while (!isDeepestMessage) {
      isDeepestMessage = !message.message;
      message = isDeepestMessage ? message : message.message;
    }

    const errorResponse = {
      message: message || '请求失败',
    };

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    Logger.error(
      `Catch http exception at ${request.method} ${request.url} ${status}`,
    );

    Logger.error('exception', JSON.stringify(exception));

    response.status(status);
    response.header('Content-Type', 'application/json; charset=utf-8');
    response.send(errorResponse);
  }
}
