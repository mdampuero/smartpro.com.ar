import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Products } from 'src/app/models/products.model';
import { environment } from 'src/environments/environment';
import { LoginService } from '../db/login.service';
import { EventsService } from '../events.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  public limit = 30;
  public offset = 0;
  public sort = "createdAt";
  public direction = "DESC";

  constructor(private http: HttpClient,public events: EventsService,public loginService:LoginService) { 
    
  }

  calcOffset(currentPage:number){
    this.offset=currentPage*this.limit;
  }

  setOrder(sort:string){
    if(this.sort==sort)
      this.direction=(this.direction=='ASC')?'DESC':'ASC';
    else
      this.direction='ASC'
    this.sort=sort;
    this.events.publish('order', {});
  }

  get() {
    return this.http.get(`${environment.apiUrl}carts/${this.loginService.user.id}`);
  }
  getPreference() {
    return this.http.get(`${environment.apiUrl}carts/api_carts_get_preference/${this.loginService.user.cart.id}`);
  }
  
  save(product:Products,amount:number) {
    let data={
      "product":product.id,
      "amount":amount
    }
    return this.http.post(`${environment.apiUrl}cartsItems/${this.loginService.user.cart.id}`, data);
  }
  delete(product:Products) {
    return this.http.delete(`${environment.apiUrl}cartsItems/${this.loginService.user.cart.id}/${product.id}`);
  }
  
}
