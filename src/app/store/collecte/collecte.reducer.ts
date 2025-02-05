import { createReducer, on } from '@ngrx/store';
import * as CollecteActions from './collecte.actions';
import { Collecte } from '../../models/collecte.model';

export interface CollecteState {
  collectes: Collecte[];
  error: string | null;
}

export const initialState: CollecteState = {
  collectes: [],
  error: null,
};

export const collecteReducer = createReducer(
  initialState,
  on(CollecteActions.loadCollectesSuccess, (state, { collectes }) => ({
    ...state,
    collectes: collectes,
    error: null,
  })),

  on(CollecteActions.updateCollecteSuccess, (state, { collecte }) => ({
    ...state,
    collectes: state.collectes.map(c =>
      c.id === collecte.id ? collecte : c
    ),
  })),

  on(CollecteActions.loadCollectesFailure, (state, { error }) => ({
    ...state,
    error: error,
  })),
  on(CollecteActions.addCollecteSuccess, (state, { collecte }) => ({
    ...state,
    collectes: [...state.collectes, collecte]
  })),

);
