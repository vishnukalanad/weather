import {createAction, props} from "@ngrx/store";
import {WeatherDataForLocation, WeatherDataModel, WeekForecastModel} from "../core/models/WeatherDataModel";

export const addPlaces = createAction('[Weather] Add Places', props<{payload: WeatherDataModel[]}>());
export const selectPlace = createAction('[Weather] Select Place', props<{payload: WeatherDataModel}>());
export const addWeatherForLocation = createAction('[Weather] Add Weather For Location', props<{payload: WeatherDataForLocation}>());
export const loadWeatherFailure = createAction(
  '[Weather API] Load Weather Failure',
  props<{ error: any }>()
);
export const addMultipleDaysForecast = createAction("[Weather] Add multiple days forecast", props<{payload: WeekForecastModel}>());
export const dispatchPlacesLoading = createAction('[Weather] Dispatch Places Loading', props<{payload: boolean}>());
