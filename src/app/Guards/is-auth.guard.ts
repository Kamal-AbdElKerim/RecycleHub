import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { selectCurrentUser } from '../store/user/selectors/auth.selectors';
import { map } from 'rxjs';

export const isAuthGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  const storedUser = localStorage.getItem('currentUser');
  if (storedUser) {
    return false;
  }
  return true;
};
