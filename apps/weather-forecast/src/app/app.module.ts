import { WeatherForecastServicesModule } from '@bp/weather-forecast/services';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { WeatherForecastModule } from './modules/weather-forecast/weather-forecast.module';
import { WeatherForecastService } from './services/weather-forecast.service';
import { CityService } from './services/city.service';
import { IWeatherForecastService } from './core/abstract/weather-forecast.abstract';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { RouterModule } from '@angular/router';
import { ICityService } from './core/abstract/city.abstract';
import { WeatherEffects } from './store/weather/weather.effects';
import { RootReducer } from './store';
import { AppEffects } from './store/app/app.effects';

@NgModule({
	declarations: [AppComponent],
	imports: [BrowserModule,
											WeatherForecastModule,
											WeatherForecastServicesModule,
											StoreModule.forRoot(RootReducer),
											EffectsModule.forRoot([WeatherEffects, AppEffects]),
											RouterModule.forRoot([]),
	],
	providers: [
		{
			provide: ICityService,
			useClass: CityService
		},
		{
			provide: IWeatherForecastService,
			useClass: WeatherForecastService
		}
	],
	bootstrap: [AppComponent],
})
export class AppModule { }
