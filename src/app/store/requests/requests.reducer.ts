import { createReducer, on } from '@ngrx/store';
import { CollectionRequest } from '../../models/request.model';
import * as RequestsActions from './requests.actions';

export interface RequestsState {
  requests: CollectionRequest[];
}

const initialState: RequestsState = {
  requests: [],
};

export const requestsReducer = createReducer(
  initialState,
  on(RequestsActions.addRequest, (state, { request }) => ({
    ...state,
    requests: [...state.requests, request],
  })),
  on(RequestsActions.updateRequest, (state, { id, changes }) => (
    {
    ...state,
    requests: state.requests.map((r) => (r.id === id ? { ...r, ...changes } : r)),
  })),
  on(RequestsActions.deleteRequest, (state, { id }) => ({
    ...state,
    requests: state.requests.filter((r) => r.id !== id),
  }))
);
