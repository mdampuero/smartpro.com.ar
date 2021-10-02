import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'role'
})
export class RolePipe implements PipeTransform {

  transform(role: string): unknown {
    switch(role){
      case 'ROLE_SUPER':
        return 'Administrador';
      case 'ROLE_ADMIN':
        return 'Editor';
      case 'ROLE_OPER':
        return 'Superusuario';
      default:
        return 'Unknown';
    }
  }

}
