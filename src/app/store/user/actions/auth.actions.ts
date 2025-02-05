import { createAction, props } from '@ngrx/store';
import { User } from '../../../models/User';

// Register User
export const registerUser = createAction('[Auth] Register User', props<{ user: User }>());
export const registerUserSuccess = createAction('[Auth] Register User Success', props<{ user: User }>());
export const registerUserFailure = createAction('[Auth] Register User Failure', props<{ error: string }>());


export const updateUser = createAction('[Auth] update User', props<{ user: User }>());
export const updateUserSuccess = createAction('[Auth] update User Success', props<{ user: User }>());
export const updateUserFailure = createAction('[Auth] update User Failure', props<{ error: string }>());


// Login User
export const loginUser = createAction('[Auth] Login User', props<{ email: string; password: string }>());
export const loginUserSuccess = createAction('[Auth] Login User Success', props<{ user: User }>());
export const loginUserFailure = createAction('[Auth] Login User Failure', props<{ error: string }>());

// Logout
export const logoutUser = createAction('[Auth] Logout User');




// Action pour supprimer un utilisateur

export const deleteUser = createAction(
  '[Auth] Delete User',
  props<{ userId: string }>()
);

export const deleteUserSuccess = createAction(
  '[Auth] Delete User Success'
);

export const deleteUserFailure = createAction(
  '[Auth] Delete User Failure',
  props<{ error: string }>()
);



// Load Users
export const loadUsers = createAction('[Auth] Load Users');
export const loadUsersSuccess = createAction('[Auth] Load Users Success', props<{ users: User[] }>());
export const loadUsersFailure = createAction('[Auth] Load Users Failure', props<{ error: string }>());
