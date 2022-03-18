import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'feeedback'
})
export class FeeedbackPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
