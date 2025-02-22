import {
  HttpErrorResponse,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, finalize, tap, throwError } from 'rxjs';
import { LoaderService } from './services/loader.service';

export const httpInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn
) => {
  const loaderService = inject(LoaderService);
  loaderService.showLoader = true;

  return next(req).pipe(
    catchError((e: HttpErrorResponse) => {
      console.log('error', e);
      return throwError(() => e);
    }),
    finalize(() => (loaderService.showLoader = false))
  );
};
