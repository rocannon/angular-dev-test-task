import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { API_ENDPOINT } from './models/api-endpoint.token';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
	imports: [CommonModule, HttpClientModule],
	providers: [{
		provide: API_ENDPOINT,
		useValue: 'http://api.openweathermap.org'
	}]
})
export class WeatherForecastServicesModule {}
