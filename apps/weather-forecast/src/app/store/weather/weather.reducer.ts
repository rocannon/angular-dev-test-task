import { Action, createReducer, on } from "@ngrx/store";
import { ForeCastModeType } from "../../core/models/forecast-mode.type";
import { IWeatherForecast } from "../../core/models/forecast.interface";
import { changeForeCastMode, getWeatherForecastSuccess } from "./weather.actions";

export interface WeatherState {
	citiesForeCast: IWeatherForecast[];
	foreCastMode: ForeCastModeType;
}
export const initialState: WeatherState = {
	citiesForeCast: [],
	foreCastMode: 'daily'
}

const reducer = createReducer(
	initialState,
	on(changeForeCastMode, (state: WeatherState, {foreCastMode}: { foreCastMode: ForeCastModeType }) => 
		({ ...state, foreCastMode })),
	on(getWeatherForecastSuccess, (state: WeatherState, newCityForeCast: IWeatherForecast) =>
		({ ...state, citiesForeCast: [...state.citiesForeCast, newCityForeCast] }))
);


export function weatherReducer(state: WeatherState | undefined, action: Action): WeatherState {
	return reducer(state, action);
}
