import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { selectCurrentUser } from '../store/user/auth.selectors';
import { map } from 'rxjs';

export const isAuthGuard: CanActivateFn = (route, state) => {
  const store = inject(Store);
  const router = inject(Router);

  return store.pipe(
    select(selectCurrentUser),
    map(user => {
      if (user?.role === 'particulier') {
        router.navigate(['/particulier']);
        return false;
      }
      return true;
    })
  );
};
