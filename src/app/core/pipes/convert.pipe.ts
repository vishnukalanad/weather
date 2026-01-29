import { Pipe, PipeTransform } from '@angular/core';

type Units = 'm' | 'km' | 'mi';

@Pipe({
  name: 'convert',
  standalone: true
})
export class ConvertPipe implements PipeTransform {
  private readonly meterMap: Record<Units, number> = {
    m: 1,
    km: 1000,
    mi: 1609.344
  }

  transform(value: number, from: Units, to: Units): unknown {
    if(!value || !from || !to) return null;

    if(from === to) return value;

    const valueToMeters = value * this.meterMap[from];
    return valueToMeters / this.meterMap[to];
  }

}
