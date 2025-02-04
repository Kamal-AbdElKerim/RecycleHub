import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideStore } from '@ngrx/store';

import { routes } from './app.routes';
import { requestsReducer } from "./store/requests/requests.reducer";
import { provideEffects } from '@ngrx/effects';
import {authReducer} from "./store/user/auth.reducer";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideStore({ requests: requestsReducer, auth: authReducer }),
    provideEffects()
  ]
};
