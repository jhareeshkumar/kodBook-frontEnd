import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router)
  const userName = localStorage.getItem('userName');
  if (userName == null) {
    router.navigate(['login']);
    return false;
  }
  return true;
};
