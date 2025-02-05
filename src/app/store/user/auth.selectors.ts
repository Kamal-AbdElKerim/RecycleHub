import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './auth.reducer';

export const selectAuthState = createFeatureSelector<AuthState>('auth');

export const selectCurrentUser = createSelector(
  selectAuthState,
  (state) => state.currentUser || JSON.parse(localStorage.getItem('currentUser') || 'null')
);

export const selectAllUsers = createSelector(
  selectAuthState,
  (state) => state.users
);

// ✅ Selector for authentication errors
export const selectAuthError = createSelector(
  selectAuthState,
  (state) => state.error
);



// ✅ Selector for update error message
export const selectUpdateError = createSelector(
  selectAuthState,
  (state) => state.updateError
);
