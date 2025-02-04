import { createReducer, on } from '@ngrx/store';
import * as AuthActions from './auth.actions';
import { User } from '../../models/User';

export interface AuthState {
  users: User[];
  currentUser: User | null;
  error: string | null;
}

const storedUser = localStorage.getItem('currentUser');
const initialState: AuthState = {
  users: [],
  currentUser: storedUser ? JSON.parse(storedUser) : null,
  error: null,
};

export const authReducer = createReducer(
  initialState,

  // ✅ Store users when loaded
  on(AuthActions.loadUsersSuccess, (state, { users }) => ({
    ...state,
    users,
  })),
  on(AuthActions.loadUsersFailure, (state, { error }) => ({
    ...state,
    error,
  })),

  // ✅ Store `currentUser` in `localStorage` after registration
  on(AuthActions.registerUserSuccess, (state, { user }) => {
    localStorage.setItem('currentUser', JSON.stringify(user));
    return {
      ...state,
      users: [...state.users, user],
      currentUser: user,
      error: null,
    };
  }),
  on(AuthActions.registerUserFailure, (state, { error }) => ({
    ...state,
    error,
  })),

  // ✅ Store `currentUser` in `localStorage` after login
  on(AuthActions.loginUserSuccess, (state, { user }) => {
    localStorage.setItem('currentUser', JSON.stringify(user));
    return {
      ...state,
      currentUser: user,
    };
  }),
  on(AuthActions.loginUserFailure, (state, { error }) => ({
    ...state,
    error,
  })),

  // ✅ Remove `currentUser` from `localStorage` on logout
  on(AuthActions.logoutUser, (state) => {
    localStorage.removeItem('currentUser');
    return {
      ...state,
      currentUser: null,
      error: null,
    };
  }),


  on(AuthActions.deleteUser, (state) => ({
    ...state,
    currentUser: null, // ✅ Remove user from state
    users: state.users.filter(u => u.id !== (state.currentUser ? state.currentUser.id : -1)) // Remove from users list, safeguard null currentUser
  })),




  on(AuthActions.deleteUserSuccess, (state) => ({
    ...state,
    currentUser: null // L'utilisateur est supprimé, donc on le supprime du state
  }))


);
