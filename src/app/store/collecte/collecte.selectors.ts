import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CollecteState  , collecteReducer} from './collecte.reducer';


export const selectCollecteState = createFeatureSelector<CollecteState>('collecte');
export const selectAllCollectes = createSelector(
  selectCollecteState,
  (state) => state.collectes
);
export const selectCollecteError = createSelector(
  selectCollecteState,
  (state) => state.error
);
