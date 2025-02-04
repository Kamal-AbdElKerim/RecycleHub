import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RequestsState } from './requests.reducer';

export const selectRequestsState = createFeatureSelector<RequestsState>('requests');

export const selectAllRequests = createSelector(
  selectRequestsState,
  (state) => state.requests
);
