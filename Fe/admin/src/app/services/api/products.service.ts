import { Injectable } from '@angular/core';
import { environment } from "src/environments/environment";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { map } from "rxjs/operators";
import { Products } from 'src/app/models/products.model';
import { EventsService } from '../events.service';
import { LoginService } from '../db/login.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  public limit = 30;
  public offset = 0;
  public sort = "updatedAt";
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

  get(query: string) {
    return this.http.get(`${environment.apiUrl}products?inStock=0&search%5Bvalue%5D=${query}&start=${this.offset}&length=${this.limit}&sort=${this.sort}&direction=${this.direction}`);
  }
  
  getOne(id: string) {
    return this.http.get(`${environment.apiUrl}products/${id}`).pipe(map((data:any) => {
      data.provider=(data.provider)?data.provider.id:'';
        if(data.picture){
          data.picturePreview=environment.imgUrl.md+data.picture;
          data.picture=null;
        }
        return data;
      })
    );
  }
  getAll() {
    return this.http.get(`${environment.apiUrl}products?search%5Bvalue%5D=&start=0&length=-1&sort=name&direction=ASC`);
  }
  getList() {
    return this.http.get(`${environment.apiUrl}productsList`);
  }

  save(data:Products) {
    data.userLastEdit=this.loginService.user.id;
    if(data.id !=='')
      return this.http.put(`${environment.apiUrl}products/${data.id}`, data);
    else
      return this.http.post(`${environment.apiUrl}products`, data);
  }
  updatePrice(data:any) {
    data.userLastEdit=this.loginService.user.id;
    return this.http.post(`${environment.apiUrl}productsUpload`, data);
  }
  delete(item:Products) {
    return this.http.delete(`${environment.apiUrl}products/${item.id}`);
  }
}
