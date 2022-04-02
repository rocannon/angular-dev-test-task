

import { Observable } from "rxjs";
import { ICity } from "../models/city.interface";


export abstract class IWeatherForecastService{
	abstract getHourlyForeCast(city: ICity): Observable<number[]>;
	abstract getDailyForeCast(city: ICity): Observable<number[]>;
}