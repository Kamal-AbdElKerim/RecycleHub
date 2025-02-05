import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import {selectCurrentUser} from "../store/user/selectors/auth.selectors";

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const storedUser = localStorage.getItem('currentUser');
  if (storedUser) {
    return true;
  }else {
    router.navigate(['/login']);
    return false;
  }

};
