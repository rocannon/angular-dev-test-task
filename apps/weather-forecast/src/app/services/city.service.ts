import { map, Observable } from "rxjs";
import { ICity } from "../core/models/city.interface";
import { ICityService } from "../core/abstract/city.abstract";
import { WeatherForecastApiService } from '@bp/weather-forecast/services';
import { Injectable } from "@angular/core";

@Injectable()
export class CityService extends ICityService {

	constructor(private readonly apiService: WeatherForecastApiService) {
		super();
	}

	getCities(searchQuery: string): Observable<ICity[]> {
		return this.apiService.getCities(searchQuery).pipe(map(cities => {
			return cities.map(city => ({
				latitude: city.lat,
				longitude: city.lon,
				name: city.state ? `${city.name}, ${city.state}` : city.name,
			}))

		}));
	}
}