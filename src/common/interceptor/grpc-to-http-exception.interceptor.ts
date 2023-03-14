import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { getHttpExceptionFromGrpc } from './../utils/get-http-exception-from-grpc.util';

@Injectable()
export class GrpcToHttpInterceptor implements NestInterceptor {
  intercept(_context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      catchError((err) => {
        return throwError(() => {
          if (!err.code) {
            return err;
          }

          return getHttpExceptionFromGrpc(err);
        });
      }),
    );
  }
}
