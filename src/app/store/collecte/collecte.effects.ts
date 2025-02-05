import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as CollecteActions from './collecte.actions';
import { catchError, map, mergeMap, of } from 'rxjs';
import {CollecteService} from "../../service/collecte.service";

@Injectable()
export class CollecteEffects {
  constructor(private actions$: Actions, private collecteService: CollecteService) {}

  loadCollectes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CollecteActions.loadCollectes),  // Action to trigger load
      mergeMap(() =>
        this.collecteService.getCollectes().pipe(  // Call the service to fetch data
          map((collectes) => CollecteActions.loadCollectesSuccess({ collectes })),  // Dispatch success action
          catchError((error) => of(CollecteActions.loadCollectesFailure({ error: error.message })))  // Handle errors
        )
      )
    )
  );

  addCollecte$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CollecteActions.addCollecte),
      mergeMap(({ collecte }) =>
        this.collecteService.addCollecte(collecte).pipe(
          map(newCollecte => CollecteActions.addCollecteSuccess({ collecte: newCollecte })),
          catchError(error => of(CollecteActions.addCollecteFailure({ error: error.message })))
        )
      )
    )
  );

  // ✅ Delete collecte
  deleteCollecte$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CollecteActions.deleteCollecte),
      mergeMap(({ id }) =>
        this.collecteService.deleteCollecte(id).pipe(
          map(() => CollecteActions.deleteCollecteSuccess({ id })),  // Dispatch success with deleted ID
          catchError(error => of(CollecteActions.deleteCollecteFailure({ error: error.message })))  // Handle errors
        )
      )
    )
  );

  updateCollecte$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CollecteActions.updateCollecte),
      mergeMap(({ collecte }) =>
        this.collecteService.updateCollecte(collecte).pipe(
          map(updatedCollecte => CollecteActions.updateCollecteSuccess({ collecte: updatedCollecte })),
          catchError(error => of(CollecteActions.updateCollecteFailure({ error: error.message })))
        )
      )
    )
  );


}
