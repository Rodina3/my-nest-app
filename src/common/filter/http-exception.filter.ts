import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger('HttpExceptionFilter');

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    if (request.url.toString().includes('/api-docs')) {
      response.status(HttpStatus.OK);
      response.end();
      return;
    }

    /* eslint-disable  @typescript-eslint/no-explicit-any */
    let message: any = exception.message;
    let isDeepestMessage = false;
    while (!isDeepestMessage) {
      isDeepestMessage = !message.message;
      message = isDeepestMessage ? message : message.message;
    }

    const errorResponse = {
      message: message || 'Request Failed',
    };

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    this.logger.error(
      `HttpException: ${request.method} ${decodeURI(request.url)} ${status}`,
    );

    this.logger.error(`Exception details: ${JSON.stringify(exception)}`);

    response.status(status);
    response.header('Content-Type', 'application/json; charset=utf-8');
    response.send(errorResponse);
  }
}
