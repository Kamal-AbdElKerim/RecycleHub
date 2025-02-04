import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideHttpClient } from '@angular/common/http'; // Import this

import { routes } from './app.routes';
import { requestsReducer } from "./store/requests/requests.reducer";
import { authReducer } from "./store/user/auth.reducer";
import { AuthEffects } from "./store/user/auth.effects";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideStore({ requests: requestsReducer, auth: authReducer }),
    provideEffects(AuthEffects),
    provideHttpClient()
  ]
};
