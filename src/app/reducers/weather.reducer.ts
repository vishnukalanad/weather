import {WeatherDataForLocation, WeatherDataModel, WeekForecastModel} from "../core/models/WeatherDataModel";
import {createReducer, on} from "@ngrx/store";
import {
  addMultipleDaysForecast,
  addPlaces,
  addWeatherForLocation,
  dispatchPlacesLoading,
  selectPlace
} from "../actions/weather.action";

export interface WeatherState {
  places: WeatherDataModel[];
  selectedPlace: WeatherDataModel | null;
  currentWeather: WeatherDataForLocation | null;
  placesLoading: boolean;
  weekForecast: WeekForecastModel | null;
}

const initialState: WeatherState = {
  places: [],
  selectedPlace: null,
  currentWeather: null,
  placesLoading: false,
  weekForecast: null
};

export const weatherReducer = createReducer(
  initialState,
  on(addPlaces, (state, {payload}) => ({
    ...state,
    places: payload
  })),
  on(selectPlace, (state, {payload}) => ({
    ...state,
    selectedPlace: payload
  })),
  on(addWeatherForLocation, (state, {payload}) => ({
    ...state,
    currentWeather: payload
  })),
  on(dispatchPlacesLoading, (state, {payload}) => ({
    ...state,
    placesLoading: payload
  })),
  on(addMultipleDaysForecast, (state, {payload}) => ({
    ...state,
    weekForecast: payload
  }))
);
