import { Hourly } from "./hourly.interface";


export interface HourlyForeCast {
	hourly: Hourly[];
	lat: number;
	lon: number;
	timezone: string;
	timezone_offset: number;
}