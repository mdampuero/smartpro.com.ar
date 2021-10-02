import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'date'
})
export class DatePipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {
    let dateTime=value.split('T');
    let ymd=dateTime[0].split('-')
    return `${ymd[2]}/${ymd[1]}/${ymd[0]}`;
  }

}
