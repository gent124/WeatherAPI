import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'temperatureConverter'
})
export class TemperatureConverter implements PipeTransform {
    transform(value: number, unit: string): number {

        if (value && !isNaN(value)) {
            value = Math.round(value - 273.15);
        }
        return value;
    }
}