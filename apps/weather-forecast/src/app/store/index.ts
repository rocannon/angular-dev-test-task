import * as fromWeather from './weather/weather.reducer';


export interface RootState {
	weather: fromWeather.WeatherState;
}

export const RootReducer = {
	weather: fromWeather.weatherReducer
};