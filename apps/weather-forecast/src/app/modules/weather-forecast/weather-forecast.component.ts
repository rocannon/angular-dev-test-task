import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { catchError, debounceTime, filter, map, Observable, of, Subject, switchMap, take, takeUntil, tap } from 'rxjs';
import { ICityService } from '../../core/abstract/city.abstract';
import { ICity } from '../../core/models/city.interface';
import { IWeatherForecast } from '../../core/models/forecast.interface';
import { getDailyColumns } from '../../functions/get-daily-columns.function';
import { getHourlyColumns } from '../../functions/get-hourly-columns.function';
import { RootState } from '../../store';
import { addCity, changeForeCastMode } from '../../store/weather/weather.actions';
import { selectForeCastMode, selectCitiesForeCast } from '../../store/weather/weather.selectors';
import { Column } from '../../core/models/column.model';
import { updateQueryParams } from '../../store/app/app.actions';

@Component({
	selector: 'app-weather-forecast',
	templateUrl: './weather-forecast.component.html',
	styleUrls: ['./weather-forecast.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class WeatherForecastComponent implements OnInit, OnDestroy {

	searhBox = new FormControl();
	toggleForeCastMode = new FormControl();

	options$ = new Subject<Partial<ICity>[]>();
	hourlyColumns = getHourlyColumns();
	dailyColumns = getDailyColumns();
	headerColumns: string[] = [];

	destroyed$ = new Subject<void>();
	weatherSource$: Observable<IWeatherForecast[]> = of([]);
	columns$: Observable<Column[]> = of([]);

	get queryParams() {
		return {params: { city: this.searhBox.value, forecastMode: this.toggleForeCastMode.value }};
	}

	constructor(private readonly cityService: ICityService,
													private readonly store: Store<RootState>) {
	}


	ngOnInit() {
		this.store.select('weather')
			.pipe(
				select(selectForeCastMode),
				take(1))
			.subscribe(value => this.toggleForeCastMode.setValue(value));

		this.columns$ = this.store.select('weather')
			.pipe(
				select(selectForeCastMode),
				map(foreCastMode => foreCastMode === 'hourly' ? this.hourlyColumns : this.dailyColumns),
				tap(columns => this.headerColumns = columns.map(column => column.columnDef)),
				takeUntil(this.destroyed$));

		this.weatherSource$ = this.store.select('weather')
			.pipe(
				select(selectCitiesForeCast),
				takeUntil(this.destroyed$));

		this.searhBox.valueChanges
			.pipe(
				debounceTime(200),
				filter(value => value),
				tap(() =>  this.store.dispatch(updateQueryParams(this.queryParams))),
				switchMap((value) => this.cityService.getCities(value)),
				catchError(() => of([])),
				map(cities => cities.length > 0 ? cities : [{ name: 'No City Found' }]),
				takeUntil(this.destroyed$))
			.subscribe(values => this.options$.next(values));

		this.toggleForeCastMode.valueChanges
			.pipe(
				tap(() => this.store.dispatch(updateQueryParams(this.queryParams))),
				takeUntil(this.destroyed$))
			.subscribe(value => {
				this.store.dispatch(changeForeCastMode({ foreCastMode: value }));
			});
	}

	ngOnDestroy() {
		this.destroyed$.next();
		this.destroyed$.complete();
	}

	selectCity(city: ICity) {
		if (!city.latitude || !city.longitude) {
			return;
		}
		this.store.dispatch(addCity(city));
		this.options$.next([]);
		this.searhBox.reset();

	}

	public getAutoCompleteDisplayValue(value: ICity | null) {
		return value?.name || '';
	}
}
