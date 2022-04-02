import { Daily } from "./daily.interface";

export interface DailyForeCast {
	daily: Daily[];
	lat: number;
	lon: number;
	timezone: string;
	timezone_offset: number;
}
