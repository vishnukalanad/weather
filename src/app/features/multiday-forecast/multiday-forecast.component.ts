import {Component, Inject} from '@angular/core';
import {WEATHER_SERVICE} from "../../core/constants/WeatherServiceInjectors";
import {WeatherApiContract} from "../../core/models/weatherApi";
import {Store} from "@ngrx/store";
import {Observable} from "rxjs";
import {WeekForecastModel} from "../../core/models/WeatherDataModel";
import {weekForecastSelector} from "../../selectors/weather.selector";
import {ApiService} from "../../core/services/api.service";
import {addMultipleDaysForecast} from "../../actions/weather.action";
import {AsyncPipe, DatePipe} from "@angular/common";

@Component({
  selector: 'app-multiday-forecast',
  standalone: true,
  imports: [
    AsyncPipe,
    DatePipe
  ],
  providers: [{
    provide: WEATHER_SERVICE,
    useClass: ApiService
  }],
  templateUrl: './multiday-forecast.component.html',
  styleUrl: './multiday-forecast.component.css'
})
export class MultidayForecastComponent {
  weatherState$: Observable<WeekForecastModel | null> | null = null;

  constructor(@Inject(WEATHER_SERVICE) private apiService: WeatherApiContract, private store: Store) {
    this.weatherState$ = store.select(weekForecastSelector);
  }

  ngOnInit(): void {

  }

}
