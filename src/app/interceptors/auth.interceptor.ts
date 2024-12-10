import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { SpinnerService } from '../services/spinner.service';
import { finalize } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const spinnerService = inject(SpinnerService);

  spinnerService.showSpinner();

  const basicAuthHeader = localStorage.getItem('Authorization');

  if (basicAuthHeader) {
    const clonedRequest = req.clone({
      setHeaders: {
        Authorization: basicAuthHeader
      }
    });
    console.log("REQUEST CLONED AND PROCEESED")
    return next(clonedRequest).pipe(
      finalize(() =>
        spinnerService.hideSpinner())
    );
  }

  return next(req).pipe(
    finalize(() => spinnerService.hideSpinner())
  );
};
