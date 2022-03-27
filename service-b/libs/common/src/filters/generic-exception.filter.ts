import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Response } from 'express';
import { STATUS_CODES } from 'http';
import { QueryFailedError } from 'typeorm';
import { QueryFailedFilter } from './query-failed.filter';
import { BadRequestFilter } from './bad-request.filter';

@Catch()
@Injectable()
export class GenericExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost): any {
    console.error(JSON.stringify(exception));
    if (exception instanceof HttpException) {
      new BadRequestFilter().catch(exception, host);
    } else if (exception instanceof QueryFailedError) {
      new QueryFailedFilter().catch(exception, host);
    } else {
      const ctx = host.switchToHttp();
      const response = ctx.getResponse<Response>();

      const errorResponse = new ErrorResponseModel();
      errorResponse.statusCode = HttpStatus.INTERNAL_SERVER_ERROR;

      if (exception instanceof Error) {
        errorResponse.messages = 'Looks like something went wrong!';
      } else {
        errorResponse.statusCode = errorResponse.statusCode;
        errorResponse.messages = exception.message;
      }

      errorResponse.error = STATUS_CODES[errorResponse.statusCode];

      response.status(errorResponse.statusCode).json(errorResponse);
    }
  }
}

export class ErrorResponseModel {
  statusCode: number;
  error: string;
  messages: string;
}
