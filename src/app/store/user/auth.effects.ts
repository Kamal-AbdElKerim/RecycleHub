import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import {catchError, map, mergeMap, of, switchMap, tap} from 'rxjs';
import * as AuthActions from './auth.actions';
import { User } from '../../models/User';
import {
  deleteUser, deleteUserFailure,
  deleteUserSuccess,
  registerUser,
  registerUserFailure,
  registerUserSuccess,
} from "./auth.actions";

@Injectable()
export class AuthEffects {
  private API_URL = 'http://localhost:3000/users'; // JSON Server URL

  constructor(private actions$: Actions, private http: HttpClient, private store: Store) {}

  // Load Users
  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loadUsers),
      mergeMap(() =>
        this.http.get<User[]>(this.API_URL).pipe(
          map((users) => AuthActions.loadUsersSuccess({ users })),
          catchError((error) => of(AuthActions.loadUsersFailure({ error: error.message })))
        )
      )
    )
  );

  // Register User
  registerUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(registerUser),
      mergeMap(({ user }) =>
        this.http.get<User[]>(`${this.API_URL}?email=${user.email}`).pipe(
          switchMap((existingUsers) => {
            if (existingUsers.length > 0) {
              return of(registerUserFailure({ error: 'Email already exists' }));
            } else {
              return this.http.post<User>(this.API_URL, user).pipe(
                map((newUser: User) => registerUserSuccess({ user: newUser })),
                catchError((error) => of(registerUserFailure({ error: error.message })))
              );
            }
          }),
          catchError((error) => of(registerUserFailure({ error: error.message })))
        )
      )
    )
  );

  // Login User
  loginUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loginUser),
      mergeMap(({ email, password }) =>
        this.http.get<User[]>(`${this.API_URL}?email=${email}&password=${password}`).pipe(
          map((users) => {
            const user = users.length > 0 ? users[0] : null;
            return user
              ? AuthActions.loginUserSuccess({ user })
              : AuthActions.loginUserFailure({ error: 'Invalid Email Or Password' });
          }),
          catchError((error) => of(AuthActions.loginUserFailure({ error: error.message })))
        )
      )
    )
  );


// Supprimer un utilisateur
deleteUser$ = createEffect(() =>
  this.actions$.pipe(
    ofType(deleteUser),
    mergeMap(({ userId }) =>
      this.http.delete(`${this.API_URL}/${userId}`).pipe(
        map(() => deleteUserSuccess()),
        catchError((error) => of(deleteUserFailure({ error: error.message })))
      )
    )
  )
);

}
