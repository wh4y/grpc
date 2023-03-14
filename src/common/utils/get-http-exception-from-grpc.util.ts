import { HttpException, HttpStatus } from '@nestjs/common';
import { GrpcExceptionCode } from '../enum/grpc-exception-code.enum';

const httpCodeFormGrpcStatus = {
  [GrpcExceptionCode.INVALID_ARGUMENT]: HttpStatus.BAD_REQUEST,
};

export const getHttpExceptionFromGrpc = (exception: any) => {
  const statusCode = httpCodeFormGrpcStatus[exception.code] ?? HttpStatus.INTERNAL_SERVER_ERROR;
  const httpException: HttpException = new HttpException(
    { statusCode, message: exception.message.replace(/^\d\s.*:\s/, '') },
    statusCode,
  );

  return httpException;
};
