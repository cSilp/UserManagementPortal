import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideStore } from '@ngrx/store';
import { initialState } from './store/store.state';
import { provideEffects } from '@ngrx/effects';
import { UsersEffects } from './store/store.effects';
import { provideHttpClient, withFetch } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    provideClientHydration(),
    provideStore(initialState),
    provideEffects([UsersEffects]),
    provideHttpClient(withFetch()),
    provideAnimations()
]
};
