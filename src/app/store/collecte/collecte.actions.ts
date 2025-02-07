import { createAction, props } from '@ngrx/store';
import { Collecte } from '../../models/collecte.model';

export const loadCollectes = createAction('[Collecte] Load Collectes', props<{ id: string }>());
export const loadCollectesSuccess = createAction('[Collecte] Load Collectes Success', props<{ collectes: Collecte[] }>());
export const loadCollectesFailure = createAction('[Collecte] Load Collectes Failure', props<{ error: string }>());

export const loadCollectesByCity = createAction('[Collecte] Load Collectes By Address', props<{ address: string }>());

export const loadCollectesByCollecteurId = createAction('[Collecte] Load Collectes By CollecteurId', props<{ id: string }>());


export const addCollecte = createAction('[Collecte] Add Collecte', props<{ collecte: Collecte }>());
export const addCollecteSuccess = createAction('[Collecte] Add Collecte Success', props<{ collecte: Collecte }>());
export const addCollecteFailure = createAction('[Collecte] Add Collecte Failure', props<{ error: string }>());

export const deleteCollecte = createAction('[Collecte] Delete Collecte', props<{ id: string }>());
export const deleteCollecteSuccess = createAction('[Collecte] Delete Collecte Success', props<{ id: string }>());
export const deleteCollecteFailure = createAction('[Collecte] Delete Collecte Failure', props<{ error: string }>());

export const updateCollecte = createAction('[Collecte] Update Collecte', props<{ collecte: Collecte }>());
export const updateCollecteSuccess = createAction('[Collecte] Update Collecte Success', props<{ collecte: Collecte }>());
export const updateCollecteFailure = createAction('[Collecte] Update Collecte Failure', props<{ error: string }>());
