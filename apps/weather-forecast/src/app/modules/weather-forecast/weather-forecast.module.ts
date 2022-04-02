import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherForecastComponent } from './weather-forecast.component';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
	imports: [
		CommonModule,
		ReactiveFormsModule,
		MatButtonModule,
		MatIconModule,
		MatAutocompleteModule,
		MatInputModule,
		MatTableModule,
		MatButtonToggleModule
	],
	declarations: [WeatherForecastComponent],
	exports: [WeatherForecastComponent]
})
export class WeatherForecastModule { }
