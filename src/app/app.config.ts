import {ApplicationConfig, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {provideStore} from '@ngrx/store';
import {HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi} from "@angular/common/http";
import {InterceptorService} from "./core/services/interceptor.service";
import {weatherReducer} from "./reducers/weather.reducer";
import {provideEffects} from "@ngrx/effects";
import {WeatherEffects} from "./effects/weather.effects";

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({eventCoalescing: true}),
    provideRouter(routes),
    provideStore({
      weatherState: weatherReducer
    }),
    provideHttpClient(),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
    },
    // provideEffects(WeatherEffects)
  ]
};
