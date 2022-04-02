import { IWeatherForecast } from "../core/models/forecast.interface"
import { Column } from "../core/models/column.model";


export function getDailyColumns(): Column[] {

	const weekDays = ['Mon', 'Tue', "Wed", 'Thu', "Fri", "Sat", 'Sun'];

	const columns = [
		{
			columnDef: 'City Name',
			header: 'City Name',
			cell: (element: IWeatherForecast) => `${element.city.name}`,
		}];


	weekDays.forEach((day,index) => {
		columns.push({
			columnDef: day,
			header: day,
			cell: (element: IWeatherForecast) => `${element.dailyForeCast[index]}°`,
		})
	});

	return columns;
    
}
