import { createReducer, on } from '@ngrx/store';
import * as AuthActions from '../actions/auth.actions';
import { User } from '../../../models/User';

export interface AuthState {
  users: User[];
  currentUser: User | null;
  error: string | null;
  updateSuccess: boolean | null;
  updateError: string | null;
}

const storedUser = localStorage.getItem('currentUser');
const initialState: AuthState = {
  users: [],
  currentUser: storedUser ? JSON.parse(storedUser) : null,
  error: null,
  updateSuccess: null, // ✅ Added missing initialization
  updateError: null,
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

  // ✅ Handle user update success and failure
  on(AuthActions.updateUserSuccess, (state, { user }) => {
    localStorage.setItem('currentUser', JSON.stringify(user));
    return {
      ...state,

      updateSuccess: true,
      updateError: null,
    };
  }),

  on(AuthActions.updateUserFailure, (state, { error }) => ({
    ...state,
    updateSuccess: false,
    updateError: error,
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
      updateSuccess: null, // ✅ Reset update status
      updateError: null,
    };
  }),

  // ✅ Fix `deleteUser` action logic


  on(AuthActions.deleteUser, (state, { userId }) => ({
    ...state,
    users: state.users.filter(user => user.id !== userId),
    currentUser: null,
  })),

  on(AuthActions.deleteUserSuccess, (state) => ({
    ...state,
    currentUser: null
  })),

  on(AuthActions.deleteUserFailure, (state, { error }) => ({
    ...state,
    error
  })),

);
