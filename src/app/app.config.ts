import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideToastr } from 'ngx-toastr';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideAnimations, provideNoopAnimations } from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    // provideClientHydration(),//this is only enabled in ssr
    provideHttpClient(withFetch()),
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
