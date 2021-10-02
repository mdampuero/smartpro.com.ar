import { Injectable } from '@angular/core';
import { Login } from 'src/app/models/login.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public user:any;
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
    localStorage.setItem("sp-user-ecommerce", JSON.stringify(this.user));
  }
  logout() {
    this.user = {};
    this.saveStorage();
  }
}
