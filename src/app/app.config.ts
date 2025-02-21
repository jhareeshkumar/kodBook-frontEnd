import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withViewTransitions } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideToastr } from 'ngx-toastr';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideAnimations, provideNoopAnimations } from '@angular/platform-browser/animations';
import { authInterceptor } from './core/interceptors/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withViewTransitions()),
    // provideClientHydration(),//this is only enabled in ssr
    provideHttpClient(withFetch(), withInterceptors([authInterceptor])),
    provideAnimationsAsync(),// required animations providers for toastr
    provideAnimations(),
    provideNoopAnimations(),
    provideToastr({
      positionClass: 'toast-top-right',
      timeOut: 5000,
      progressBar: true,
      closeButton: true,
      preventDuplicates: true,
      tapToDismiss: false,
    }), // Toastr providers
  ]
};
