import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import type { FastifyReply } from 'fastify';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp(); // get basic nestjs framework engine
    const reply = ctx.getResponse<FastifyReply>();

    if (exception instanceof HttpException) {
      const exceptionResponse: any = exception.getResponse();
      console.log('HttpException exception filter');

      const statusCode =
        exceptionResponse?.status || exceptionResponse.statusCode || 500;
      const message = exceptionResponse?.message;
      const error = exceptionResponse?.error;

      console.error(exceptionResponse);

      const res = {
        statusCode,
        message,
        error,
      };

      // Add log controller

      reply.status(statusCode).send(res);
    } else {
      console.error(exception);
      reply
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .send('Internal server error');
    }
  }
}
