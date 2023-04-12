import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from "src/environments/environment.development";
import { WeatherResponse } from '../interfaces/weather-response.interface'


@Injectable({
    providedIn: 'root'
})

export class WeatherService {

    constructor(private http: HttpClient) {

    }

    getWeather(lon: number, lat: number) {
        console.log('in service')
        const url = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${environment.API_KEY}`;

        return this.http.get<WeatherResponse>(url).pipe(
            catchError(error => {
                const errorMessage = `Failed to retrieve weather data: ${error.message}`;
                return throwError(() => new Error(errorMessage));
            })
        )
    }
}
