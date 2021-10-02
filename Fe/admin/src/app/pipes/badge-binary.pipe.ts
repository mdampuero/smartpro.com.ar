import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'badgeBinary'
})
export class BadgeBinaryPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    switch(value){
      case true:
        return '<span class="badge badge-pill badge-success">SI</span>';
      default:
        return '<span class="badge badge-pill badge-danger">NO</span>';
    }
  }

}
