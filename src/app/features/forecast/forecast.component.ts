import {Component, Inject} from '@angular/core';
import {WEATHER_SERVICE} from "../../core/constants/WeatherServiceInjectors";
import {WeatherApiContract} from "../../core/models/weatherApi";
import {Store} from "@ngrx/store";
import {Observable} from "rxjs";
import {WeatherDataForLocation, WeatherDataModel} from "../../core/models/WeatherDataModel";
import {selectedPlace, selectWeatherForPlace} from "../../selectors/weather.selector";
import {AsyncPipe, DatePipe} from "@angular/common";
import {selectPlace} from "../../actions/weather.action";
import {ApiService} from "../../core/services/api.service";
import {ConvertPipe} from "../../core/pipes/convert.pipe";

@Component({
  selector: 'app-forecast',
  standalone: true,
  imports: [
    AsyncPipe,
    DatePipe,
    ConvertPipe
  ],
  providers: [
    {
      provide: WEATHER_SERVICE,
      useClass: ApiService
    }
  ],
  templateUrl: './forecast.component.html',
  styleUrl: './forecast.component.css'
})
export class ForecastComponent {
  weather: Observable<WeatherDataForLocation | null> | null = null;
  place$: Observable<WeatherDataModel | null>;
  constructor(@Inject(WEATHER_SERVICE) private weatherApiService: WeatherApiContract, private store: Store) {
    this.weather = store.select(selectWeatherForPlace);
    this.place$ = store.select(selectedPlace)
  }

  ngOnInit(): void {
    this.checkStoredWeather();
  }

  checkStoredWeather() {
    const locData = localStorage.getItem('weatherData');
    console.log(JSON.parse(locData ?? '{}'));
    if(locData) {
      this.store.dispatch(selectPlace({payload: JSON.parse(locData)}));
      // this.getWeather(JSON.parse(locData).latitude, JSON.parse(locData).longitude);
    }
  }

  toUTCTime(date: string, zone: string) {
    return new Date(new Date(date+'Z').toISOString()).toLocaleString(
      "en-US",
      {
        timeZone: zone,
        hour12: false,
      }
    )
  }
}
