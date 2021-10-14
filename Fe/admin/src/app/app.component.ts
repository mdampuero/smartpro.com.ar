import { Component } from '@angular/core';
import { LoginService } from './services/db/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  title = 'MDA Software';
  constructor(public loginService:LoginService) {
    setInterval(() => {   
      if(this.loginService.user){
        if((this.loginService.unixtime() - this.loginService.user.lastActivity) > (this.loginService.durationSession * 60) ){
          this.loginService.logout();
          location.reload();         
        }
      }
    }, 60000);
   }

  logout(){
    this.loginService.logout();
    location.reload();
  }
}
