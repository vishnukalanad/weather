import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Injectable} from "@angular/core";
import {ApiService} from "../core/services/api.service";
import {addWeatherForLocation, loadWeatherFailure, selectPlace} from "../actions/weather.action";
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import {WeatherDataForLocation} from "../core/models/WeatherDataModel";

@Injectable()
export class WeatherEffects {

  persistSelectedPlace$ = createEffect(
    () => this.actions$.pipe(
      ofType(selectPlace),
      tap(({payload}) => localStorage.setItem('weatherData', JSON.stringify(payload)))
    ),
    {
      dispatch: false
    }
  )

  loadWeatherForSelectedPlace$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(selectPlace),
      switchMap(({payload}) => {
        return this.service.getWeatherFromCoords(payload.latitude.toString(), payload.longitude.toString()).pipe(
          map((data: WeatherDataForLocation) => addWeatherForLocation({payload: data})), catchError(error =>
            of(loadWeatherFailure({error}))
          )
        )
      })
    )
  })

  constructor(private actions$: Actions, private service: ApiService) {
  }
}
