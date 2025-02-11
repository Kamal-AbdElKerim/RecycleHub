import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from '../reducer/auth.reducer';

export const selectAuthState = createFeatureSelector<AuthState>('auth');

export const selectCurrentUser = createSelector(
  selectAuthState,
  (state) => state.currentUser || JSON.parse(localStorage.getItem('currentUser') || 'null')
);

export const selectAllUsers = createSelector(
  selectAuthState,
  (state) => state.users
);

export const selectAuthError = createSelector(
  selectAuthState,
  (state) => state.error
);



export const selectUpdateError = createSelector(
  selectAuthState,
  (state) => state.updateError
);
