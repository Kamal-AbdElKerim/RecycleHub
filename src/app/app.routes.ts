import { Routes } from '@angular/router';
import {authGuard} from "./Guards/auth.guard";
import {isAuthGuard} from "./Guards/is-auth.guard";
import {NotfoundComponent} from "./component/notfound/notfound.component";
import {CollecteurComponent} from "./component/collecteur/collecteur.component";
import {collecteurGuard} from "./Guards/collecteur.guard";
import {particulierGuard} from "./Guards/particulier.guard";

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./component/login/login.component').then(m => m.LoginComponent),
    canActivate: [isAuthGuard]
  },
  {
    path: 'register',
    loadComponent: () => import('./component/register/register.component').then(m => m.RegisterComponent),
    canActivate: [isAuthGuard]
  },
  {
    path: 'particulier',
    loadComponent: () => import('./component/particulier/particulier.component').then(m => m.ParticulierComponent),
    canActivate: [authGuard , particulierGuard]
  },
  {
    path: 'collecteur',
    loadComponent: () => import('./component/collecteur/collecteur.component').then(m => m.CollecteurComponent),
    canActivate: [authGuard , collecteurGuard]
  },
  {
    path: 'settings',
    loadComponent: () => import('./component/settings/settings.component').then(m => m.SettingsComponent)
  },

  {
    path: '**',
    loadComponent: () => import('./component/notfound/notfound.component').then(m => m.NotfoundComponent),

  },

];
