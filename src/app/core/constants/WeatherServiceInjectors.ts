import {InjectionToken} from "@angular/core";
import {WeatherApiContract} from "../models/weatherApi";

export const WEATHER_SERVICE = new InjectionToken<WeatherApiContract>('WEATHER_SERVICE')
