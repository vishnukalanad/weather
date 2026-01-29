import {createFeatureSelector, createSelector} from "@ngrx/store";
import {WeatherState} from "../reducers/weather.reducer";


export const weatherStateSelector = createFeatureSelector<WeatherState>('weatherState');

export const selectPlaces = createSelector(weatherStateSelector, state => state.places);
export const selectedPlace = createSelector(weatherStateSelector, state => state.selectedPlace);
export const selectWeatherForPlace = createSelector(weatherStateSelector, state => state.currentWeather);
export const placeLoadingStateSelector = createSelector(weatherStateSelector, state => state.placesLoading);
export const weekForecastSelector = createSelector(weatherStateSelector, state => state.weekForecast);
