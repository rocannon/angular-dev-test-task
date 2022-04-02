import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, forkJoin, map, of, switchMap } from 'rxjs';
import { IWeatherForecastService } from '../../core/abstract/weather-forecast.abstract';
import { showError } from '../app/app.actions';
import { addCity, getWeatherForecastSuccess } from './weather.actions';

@Injectable()
export class WeatherEffects {

	getWeatherForecast$ = createEffect(() => {
		return this.actions.pipe(
			ofType(addCity),
			switchMap((city) => forkJoin(
				[
					of(city),
					this.weatherForecastService.getDailyForeCast(city),
					this.weatherForecastService.getHourlyForeCast(city)]
			)),
			map(([city, dailyForeCast, hourlyForeCast]) =>
				getWeatherForecastSuccess({ city, dailyForeCast, hourlyForeCast })
			),
			catchError(() => of(showError({ errorMessage: 'Server is unavailable. Try it later.' })))
		)
	});

	constructor(
		private readonly actions: Actions,
		private readonly weatherForecastService: IWeatherForecastService
	) { }


}
