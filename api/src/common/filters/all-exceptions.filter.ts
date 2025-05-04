import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    HttpStatus,
    Logger,
  } from '@nestjs/common';
  import { Request, Response } from 'express';
  
  @Catch()
  export class AllExceptionsFilter implements ExceptionFilter {
    private readonly logger = new Logger(AllExceptionsFilter.name);
  
    catch(exception: unknown, host: ArgumentsHost) {
      console.log('>> AllExceptionsFilter catch:', exception);
  
      const ctx      = host.switchToHttp();
      const res      = ctx.getResponse<Response>();
      const req      = ctx.getRequest<Request>();
  
      const status =
        exception instanceof HttpException
          ? exception.getStatus()
          : HttpStatus.INTERNAL_SERVER_ERROR;
  
      const responseBody =
        exception instanceof HttpException
          ? exception.getResponse()
          : { message: 'Internal server error' };
  
      let message: string;
      if (typeof responseBody === 'string') {
        message = responseBody;
      } else if (
        typeof responseBody === 'object' &&
        (responseBody as any).message
      ) {
        const m = (responseBody as any).message;
        message = Array.isArray(m) ? m.join('; ') : String(m);
      } else {
        message = JSON.stringify(responseBody);
      }
  
      this.logger.error(`${req.method} ${req.url} → HTTP ${status}`, message);
  
      res.status(status).json({
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: req.url,
        error: message,
      });
    }
  }
  