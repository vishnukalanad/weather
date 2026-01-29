import {Component, Inject} from '@angular/core';
import {WEATHER_SERVICE} from "../../core/constants/WeatherServiceInjectors";
import {ApiService} from "../../core/services/api.service";
import {WeatherApiContract} from "../../core/models/weatherApi";
import {Store} from "@ngrx/store";
import {
  addMultipleDaysForecast,
  addPlaces,
  addWeatherForLocation,
  dispatchPlacesLoading,
  selectPlace
} from "../../actions/weather.action";
import {WeatherDataForLocation, WeatherDataModel} from "../../core/models/WeatherDataModel";
import {placeLoadingStateSelector, selectPlaces} from "../../selectors/weather.selector";
import {debounceTime, distinctUntilChanged, filter, Observable, of, switchMap} from "rxjs";
import {AsyncPipe} from "@angular/common";
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-overview',
  standalone: true,
  imports: [
    AsyncPipe,
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: WEATHER_SERVICE,
      useClass: ApiService
    }
  ],
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.css'
})
export class OverviewComponent {
  places: Observable<WeatherDataModel[]> | null = null;
  isPlacesLoading$: Observable<boolean> | null = null;
  form: FormGroup = new FormGroup({
    place: new FormControl("")
  });

  constructor(@Inject(WEATHER_SERVICE) private weatherService: WeatherApiContract, private store: Store) {
    this.places = this.store.select(selectPlaces);
    this.isPlacesLoading$ = store.select(placeLoadingStateSelector)
  }

  ngOnInit(): void {
    this.searchPlace();
    const place = localStorage.getItem('weatherData') ? JSON.parse(localStorage.getItem('weatherData')!) : null;
    if (place) {
      console.log(place);
      this.getWeather(place.latitude.toString(), place.longitude.toString());
      this.loadWeatherForecasts(place.latitude.toString(), place.longitude.toString(), 7);
    } else if(window.navigator.geolocation) {
      console.log("load geolocation", window.navigator.geolocation)
      // window.navigator.geolocation.getCurrentPosition(position => {
      //   console.log(position)
      //   this.getWeather(position.coords.latitude.toString(), position.coords.longitude.toString());
      //   this.loadWeatherForecasts(position.coords.latitude.toString(), position.coords.longitude.toString(), 7);
      // })
    }
  }

  searchPlace() {
    this.form.get('place')?.valueChanges.pipe(
      debounceTime(400),
      distinctUntilChanged(),
      filter(value => value && value.trim() !== ''),
      switchMap(value => this.getWeatherFromPlace(value))).subscribe({
      next: (data) => {
        this.store.dispatch(addPlaces({payload: data.results}))
        this.store.dispatch(dispatchPlacesLoading({payload: false}))
      }
    });
  }

  private getWeatherFromPlace(place: string) {
    this.store.dispatch(dispatchPlacesLoading({payload: true}))
    return this.weatherService.getWeatherFromKeywords(place);
  }

  addLocationWeather(place: WeatherDataModel) {
    this.store.dispatch(selectPlace({payload: place}))
    localStorage.setItem('weatherData', JSON.stringify(place));
    this.getWeather(place.latitude.toString(), place.longitude.toString());
    this.loadWeatherForecasts(place.latitude.toString(), place.longitude.toString(), 7);
    this.store.dispatch(addPlaces({payload: []}))
  }

  getWeather(lat: string, lng: string) {
    console.log("load coordinates")
    this.weatherService.getWeatherFromCoords(lat, lng).subscribe({
      next: (data: WeatherDataForLocation) => {
        this.store.dispatch(addWeatherForLocation({payload: data}))

        console.log("places loaded");
      }
    });
  }

  private loadWeatherForecasts(lat: string, lng: string, days: number) {
    this.weatherService.getForecastForDays(lat, lng, days).subscribe({
      next: (data) => {
        this.store.dispatch(addMultipleDaysForecast({payload: data}))
      }
    })
  }
}
