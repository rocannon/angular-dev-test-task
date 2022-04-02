import { IWeatherForecast } from "./forecast.interface";

export interface Column {
	columnDef: string,
	header: string,
	cell: (element: IWeatherForecast) => string;
}