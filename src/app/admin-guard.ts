import { CanActivateFn } from '@angular/router';

export const adminGuard: CanActivateFn = (route, state) => {
  const userDetails = localStorage.getItem('adminDetails');

  if (userDetails) {
    return true;
  } else {
    return false;
  }
};
