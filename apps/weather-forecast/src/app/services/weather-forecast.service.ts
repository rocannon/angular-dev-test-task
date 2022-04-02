import { map, Observable } from "rxjs";
import { ICity } from "../core/models/city.interface";
import { IWeatherForecastService } from "../core/abstract/weather-forecast.abstract";
import { WeatherForecastApiService } from '@bp/weather-forecast/services';
import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class WeatherForecastService extends IWeatherForecastService {

	constructor(private readonly apiService: WeatherForecastApiService) {
		super();
	}

	getHourlyForeCast(city: ICity): Observable<number[]> {
		return this.apiService.getHourlyForeCast(city.latitude, city.longitude)
			.pipe(
				map(forecast => {
					return forecast.hourly.map(hourly =>
						hourly.temp
					)

				}));
	}
	getDailyForeCast(city: ICity): Observable<number[]> {
		return this.apiService.getDailyForeCast(city.latitude, city.longitude)
			.pipe(
				map(forecast => {
					return forecast.daily.map(daily =>
						daily.temp.day
					)

				}));
	}
}