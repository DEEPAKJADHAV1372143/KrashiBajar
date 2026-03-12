import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const auth2Guard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const userDetails = localStorage.getItem('farmarDetails');

  if (userDetails) {
    return true;
  } else {
    return false;
  }
};
