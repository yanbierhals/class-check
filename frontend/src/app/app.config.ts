import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http'; // MODIFICADO

import { routes } from './app.routes';
import { authInterceptor } from './services/auth.interceptor'; // IMPORTE o interceptor

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes),
    // MODIFICADO: Registra o HttpClient e o Interceptor
    provideHttpClient(withInterceptors([authInterceptor])) 
  ]
};