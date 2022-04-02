import { createAction, props } from "@ngrx/store";
import { ICity } from "../../core/models/city.interface";
import { ForeCastModeType } from "../../core/models/forecast-mode.type";
import { IWeatherForecast } from "../../core/models/forecast.interface";


export const getWeatherForecastSuccess = createAction('[Weather] Get Weather Forecast Success', props<IWeatherForecast>());
export const addCity = createAction('[Weather] Add City', props<ICity>());
export const changeForeCastMode = createAction('[Weather] Change Forecast Mode', props<{ foreCastMode: ForeCastModeType }>())
