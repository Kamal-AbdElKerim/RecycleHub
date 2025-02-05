import { CanActivateFn, Router } from '@angular/router';
import { inject } from "@angular/core";
import { Store } from "@ngrx/store";
import { selectCurrentUser } from "../store/user/selectors/auth.selectors";
import { map } from "rxjs";
import { User } from "../models/User";

export const collecteurGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  const storedUser = localStorage.getItem('currentUser');
  const data: User = storedUser ? JSON.parse(storedUser) : null;

  if (data && data.role === 'collecteur') {
    return true;
  }
  return false;
};
