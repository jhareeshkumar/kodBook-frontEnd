import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router)
  const authorization = localStorage.getItem('Authorization');
  if (!authorization) {
    router.navigate(['login']);
    return false;
  }
  return true;
};
