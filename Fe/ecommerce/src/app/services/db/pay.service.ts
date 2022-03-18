import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PayService {

  public pay:any;
  constructor() {
    this.loadStorage();
  }

  savePay(pay:any) {
    this.pay = pay;
    this.saveStorage();
  }

  loadStorage() {
    if (JSON.parse(localStorage.getItem("sp-user-pay")!)) {
      return JSON.parse(localStorage.getItem("sp-user-pay")!);
    }
  }

  saveStorage() {
    localStorage.setItem("sp-user-pay", JSON.stringify(this.pay));
  }
}
