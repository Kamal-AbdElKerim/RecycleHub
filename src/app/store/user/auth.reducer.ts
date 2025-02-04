import { createReducer, on } from '@ngrx/store';
import * as AuthActions from './auth.actions';
import {User} from "../../models/User";

export interface AuthState {
  users: User[];
  currentUser: User | null;
}

const initialState: AuthState = {
  users: [], // Pre-load collecteurs in local storage
  currentUser: null,
};

export const authReducer = createReducer(
  initialState,
  on(AuthActions.registerUser, (state, { user }) => ({
    ...state,
    users: [...state.users, user],
    currentUser: user || null
  })),
  on(AuthActions.loginUser, (state, { email, password }) => {
    const user = state.users.find((u) => u.email === email && u.password === password);
    return {
      ...state,
      currentUser: user || null,
    };
  }),
  on(AuthActions.logoutUser, (state) => ({
    ...state,
    currentUser: null,
  })),
  on(AuthActions.updateUser, (state, { id, changes }) => ({
    ...state,
    users: state.users.map((u) => (u.id === id ? { ...u, ...changes } : u)),
  })),
  on(AuthActions.deleteUser, (state, { id }) => ({
    ...state,
    users: state.users.filter((u) => u.id !== id),
    currentUser: state.currentUser?.id === id ? null : state.currentUser,
  }))
);
