
import { Observable } from "rxjs";
import { ICity } from "../models/city.interface";

export abstract class ICityService {
	abstract getCities(searchQuery: string): Observable<ICity[]>;
}
