import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public user:any;
  public durationSession=30;
  constructor() {
    this.loadStorage();
  }

  login(user:any) {
    this.user = user;
    this.saveStorage();
  }

  loadStorage() {
    if (JSON.parse(localStorage.getItem("sp-user-ecommerce")!)) {
      this.user = JSON.parse(localStorage.getItem("sp-user-ecommerce")!);
    }
  }

  saveStorage() {
    this.user.lastActivity=this.unixtime();
    localStorage.setItem("sp-user-ecommerce", JSON.stringify(this.user));
  }

  logout() {
    localStorage.setItem("sp-user-ecommerce", JSON.stringify(null));
  }
  
  isAutenticate(){
    return (this.user)?true:false;
  }

  unixtime(){
    let unixtime:any=new Date().getTime() / 1000;
    return parseInt(unixtime);
  }

}
