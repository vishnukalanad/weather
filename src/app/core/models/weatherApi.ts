import {Observable} from "rxjs";
import {WeatherDataModel, WeatherDataResponseModel} from "./WeatherDataModel";

export interface WeatherApiContract {
  getWeatherFromKeywords(place: string): Observable<WeatherDataResponseModel>;
  getWeatherFromCoords(lat: string, lng: string): Observable<any>;
  getForecastForDays(lat: string, lng: string, days: number): Observable<any>;
}
