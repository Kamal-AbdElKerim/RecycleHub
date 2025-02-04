import { createAction, props } from '@ngrx/store';
import {User} from "../../models/User";

export const registerUser = createAction(
  '[Auth] Register User',
  props<{ user: User }>()
);

export const loginUser = createAction(
  '[Auth] Login User',
  props<{ email: string; password: string }>()
);

export const logoutUser = createAction('[Auth] Logout User');

export const updateUser = createAction(
  '[Auth] Update User',
  props<{ id: string; changes: Partial<User> }>()
);

export const deleteUser = createAction(
  '[Auth] Delete User',
  props<{ id: string }>()
);
