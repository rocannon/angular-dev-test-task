
import { IWeatherForecast } from "../core/models/forecast.interface";
import { Column } from "../core/models/column.model";

export function getHourlyColumns(): Column[] {
	const columns = [
		{
			columnDef: 'City Name',
			header: 'City Name',
			cell: (element: IWeatherForecast) => `${element.city.name}`,
		}];

	for (let i = 3; i < 25; i = i + 3) {

		columns.push({
			columnDef: `${i}:00`,
			header: `${i}:00`,
			cell: (element: IWeatherForecast) => `${element.hourlyForeCast[i]}°`,
		});
	}

	return columns;

}
