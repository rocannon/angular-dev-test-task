import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { City, HourlyForeCast, DailyForeCast } from './models';
import { API_ENDPOINT } from './models/api-endpoint.token';

@Injectable({ providedIn: 'root' })
export class WeatherForecastApiService {

	private readonly _apiKey = '010721642521f31b0fbc8c3831d45951';

	constructor(
		@Inject(API_ENDPOINT) private readonly _api: string,
		private readonly _http: HttpClient) {
	}

	getCities(query: string): Observable<City[]> {
		const url = `${this._api}/geo/1.0/direct?q=${query}&limit=5&appid=${this._apiKey}`;
		return this._http.get<[City]>(url);
	}

	getHourlyForeCast(lat: number, lon: number): Observable<HourlyForeCast> {
		const url = `${this._api}/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,daily,alerts&units=metric&appid=${this._apiKey}`;
		return this._http.get<HourlyForeCast>(url);
	}

	getDailyForeCast(lat: number, lon: number): Observable<DailyForeCast> {
		const url = `${this._api}/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly,alerts&units=metric&appid=${this._apiKey}`;
		return this._http.get<DailyForeCast>(url);
	}

}