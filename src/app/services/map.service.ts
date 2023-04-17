import { Injectable } from '@angular/core';
import Map from 'ol/Map';
import View from 'ol/View';
import { OSM } from 'ol/source';
import TileLayer from 'ol/layer/Tile';
import { fromLonLat, toLonLat } from 'ol/proj';
import { CoordinateService } from './cordinate.service';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  map!: Map;

  constructor(private coordinateService: CoordinateService) {

   }

   mapInit() {
    this.map = new Map({
      target: 'map',
      layers: [
        new TileLayer({
          source: new OSM()
        })
      ],
      view: new View({
        center: fromLonLat([0, 0]),
        zoom: 2
      })
    });
  }

  onMapClick() {
    this.map.on('click', (event) => {
      const clickedCoords = toLonLat(event.coordinate);
      const [lon, lat] = clickedCoords;
      const latitude = (Math.round(lat * 100) / 100).toFixed(2);
      const longitude = (Math.round(lon * 100) / 100).toFixed(2);
      this.coordinateService.updateCoordinates(parseFloat(latitude), parseFloat(longitude));
    });
  }
}
