import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent {

  myApiKey: string = "f783b87c9a85f322e1e3dcb02722c6d0";
  lat: number = 15;
  lon: number = 20;
  weatherData: any = ""; 

  constructor(private http : HttpClient){}
  //https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}
  
  
  getWeather(location : string) { 
    console.log('inside the weather', this.http.get(`http://api.openweathermap.org/data/2.5/forecast/daily?q=London&cnt=3&appid=${this.myApiKey}`)
    .subscribe(data => 
      this.weatherData = data
      )); 
  }
}
