import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {Store} from "@ngrx/store";
import {selectCurrentUser} from "../store/user/auth.selectors";
import {map} from "rxjs";

export const collecteurGuard: CanActivateFn = (route, state) => {
  const store = inject(Store);
  const router = inject(Router);

  return store.select(selectCurrentUser).pipe(
    map(user => {
      if (user?.role === 'collecteur') {
        return true;
      } else {
        router.navigate(['/login']);
        return false;
      }
    })
  );
};
