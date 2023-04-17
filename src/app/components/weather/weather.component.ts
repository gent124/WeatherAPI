import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { WeatherService } from '../../services/weather.service';
import { CoordinateService } from '../../services/cordinate.service';
import { take } from 'rxjs/operators';
import { MapService } from 'src/app/services/map.service';
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

  constructor(private fb: FormBuilder, private weatherService: WeatherService, private coordinateService: CoordinateService, private mapService: MapService) {
    this.weatherForm = this.fb.group({
      latitude: ['', [Validators.required, Validators.min(-90), Validators.max(90)]],
      longitude: ['', [Validators.required, Validators.min(-180), Validators.max(180)]]
    });

    this.coordinateService.getCoordinates().subscribe(coords => {
      if (coords) {
        this.weatherForm.patchValue({
          latitude: coords.lat,
          longitude: coords.lon
        });
      }
    });
  }


  ngOnInit(): void {
    this.mapService.mapInit();
    this.mapService.onMapClick();
    this.weatherForm = this.fb.group({
      latitude: ['', [Validators.required, Validators.min(-90), Validators.max(90)]],
      longitude: ['', [Validators.required, Validators.min(-180), Validators.max(180)]]
    });
  }

  getWeather() {
    const latitude = this.weatherForm.get('latitude')?.value;
    const longitude = this.weatherForm.get('longitude')?.value;

    this.weatherService.getWeather(latitude, longitude)
      .subscribe(data => {
        this.weatherData = data;
        this.temperature = data.list[0].main.temp;
        this.city = data.city.name;
        this.weatherError = null;
      },
        error => {
          this.weatherError = error.message;
          this.weatherData = null;
        });
  }
}
