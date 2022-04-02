import { createSelector } from "@ngrx/store";
import { ForeCastModeType } from "../../core/models/forecast-mode.type";
import { IWeatherForecast } from "../../core/models/forecast.interface";
import { WeatherState } from "./weather.reducer";


export const selectForeCastMode = createSelector(
	(state: WeatherState) => state.foreCastMode,
	(foreCastMode: ForeCastModeType) => foreCastMode
);


export const selectCitiesForeCast = createSelector(
	(state: WeatherState) => state.citiesForeCast,
	(citiesForeCast: IWeatherForecast[]) => citiesForeCast
);



