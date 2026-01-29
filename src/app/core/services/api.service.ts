import {Injectable} from '@angular/core';
import {WeatherApiContract} from "../models/weatherApi";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ApiService implements WeatherApiContract {

  constructor(private http: HttpClient) {
  }

  getWeatherFromKeywords(place: string): Observable<any> {
    const api: string = "https://geocoding-api.open-meteo.com/v1/search?name=";
    return this.http.get(api + place);
  }

  getWeatherFromCoords(lat: string, lng: string): Observable<any> {
    const api = (lat: string, lng: string) => {
      return `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current=temperature_2m,windspeed_10m,uv_index,visibility,cloudcover,precipitation`
    }
    return this.http.get(api(lat, lng));
  }

  getForecastForDays(lat: string, lng: string, days: number): Observable<any> {
    const api = (lat: string, lng: string) => {
      return `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max&forecast_days=${days}&timezone=auto`
    }
    return this.http.get(api(lat, lng));
  }
}
