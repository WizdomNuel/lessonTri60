import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';

@Catch()
export class GlobalExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(GlobalExceptionsFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const errorResponse =
      exception instanceof HttpException
        ? exception.getResponse()
        : 'Internal server error';

    let message: string | string[] = 'Internal server error';
    let error = 'Error';

    if (typeof errorResponse === 'object' && errorResponse !== null) {
      const parsedRes = errorResponse as { message?: string | string[]; error?: string };
      if (parsedRes.message) message = parsedRes.message;
      if (parsedRes.error) error = parsedRes.error;
    } else if (typeof errorResponse === 'string') {
      message = errorResponse;
    }

    this.logger.error(
      `${request.method} ${request.url} ${status} - ${typeof message === 'string' ? message : JSON.stringify(message)}`,
      exception instanceof Error ? exception.stack : '',
    );

    response.status(status).json({
      success: false,
      message: Array.isArray(message) ? message[0] : message,
      error: error,
      statusCode: status,
      timestamp: new Date().toISOString(),
    });
  }
}
