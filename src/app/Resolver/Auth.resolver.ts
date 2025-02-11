import {ResolveFn} from '@angular/router';
import {inject} from '@angular/core';
import {select, Store} from "@ngrx/store";
import {selectCurrentUser} from "../store/user/selectors/auth.selectors";

export const AuthResolver: ResolveFn<any> = (route) => {
  const store = inject(Store);
  return store.pipe(select(selectCurrentUser))
};
