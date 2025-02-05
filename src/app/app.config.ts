import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideHttpClient } from '@angular/common/http'; // Import this

import { routes } from './app.routes';
import { requestsReducer } from "./store/requests/requests.reducer";
import { authReducer } from "./store/user/reducer/auth.reducer";
import { AuthEffects } from "./store/user/effects/auth.effects";
import {collecteReducer} from "./store/collecte/collecte.reducer";
import {CollecteEffects} from "./store/collecte/collecte.effects";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideStore({ requests: requestsReducer, auth: authReducer , collecte: collecteReducer }),
    provideEffects(AuthEffects , CollecteEffects),
    provideHttpClient()
  ]
};
