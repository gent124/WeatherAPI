import { Injectable } from '@angular/core';
import { BehaviorSubject, MonoTypeOperatorFunction } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CoordinateService {
    private coordinates = new BehaviorSubject<{ lat: number, lon: number }>({ lat: 0, lon: 0 });

    constructor() { }

    updateCoordinates(lat: number, lon: number) {
        this.coordinates.next({ lat: lat, lon: lon });
    }

    getCoordinates() {
        return this.coordinates.asObservable();
    }
}
