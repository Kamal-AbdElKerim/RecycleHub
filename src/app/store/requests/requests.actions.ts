import { createAction, props } from '@ngrx/store';
import { CollectionRequest } from '../../models/request.model';

export const addRequest = createAction(
  '[Requests] Add Request',
  props<{ request: CollectionRequest }>()
);

export const updateRequest = createAction(
  '[Requests] Update Request',
  props<{ id: string; changes: Partial<CollectionRequest> }>()
);

export const deleteRequest = createAction(
  '[Requests] Delete Request',
  props<{ id: string }>()
);
