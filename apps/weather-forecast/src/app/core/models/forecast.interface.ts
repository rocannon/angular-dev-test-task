import { ICity } from "./city.interface";

export interface IWeatherForecast {
	city: ICity;
	hourlyForeCast: number[];
	dailyForeCast: number[];
}