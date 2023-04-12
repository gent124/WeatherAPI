import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { WeatherResponse } from '../../interfaces/weather-response.interface'
import { environment } from 'src/environments/environment.development';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { WeatherService } from '../../services/weather.service'
import { TemperatureConverter } from 'src/app/pipes/temperature-converter.pipe';
@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {
  weatherForm: FormGroup = new FormGroup({
    latitude: new FormControl('', [Validators.required, Validators.min(-90), Validators.max(90)]),
    longitude: new FormControl('', [Validators.required, Validators.min(-180), Validators.max(180)])
  });
  weatherData: any;
  weatherError: string | null = null;
  temperature?: number;
  city?: string;

  constructor(private fb: FormBuilder, private weatherService: WeatherService) { }


  ngOnInit(): void {
    this.weatherForm = this.fb.group({
      latitude: ['', [Validators.required, Validators.min(-90), Validators.max(90)]],
      longitude: ['', [Validators.required, Validators.min(-180), Validators.max(180)]]
    });
  }


  getWeather() {
    console.log('in compoentns');
    const latitude = this.weatherForm.get('latitude')?.value;
    const longitude = this.weatherForm.get('longitude')?.value;

    this.weatherService.getWeather(latitude, longitude)
      .subscribe(data => {
        this.weatherData = data
        this.temperature = data.list[0].main.temp;
        this.city = data.city.name;
        this.weatherError = null;
      },
        error => {
          this.weatherError = error.message;
          this.weatherData = null;
        })
  }
};
