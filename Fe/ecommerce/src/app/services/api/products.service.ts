import { Injectable } from '@angular/core';
import { environment } from "src/environments/environment";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { map } from "rxjs/operators";
import { Products } from 'src/app/models/products.model';
import { EventsService } from '../events.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  public limit = 30;
  public offset = 0;
  public sort = "isSalient";
  public priceMin = 0;
  public priceMax = 0;
  public category = 0;
  public direction = "DESC";

  constructor(private http: HttpClient,public events: EventsService) { 

  }

  calcOffset(currentPage:number){
    this.offset=currentPage*this.limit;
  }

  setFilter(){
    this.priceMin=0;
    this.priceMax=0;
    this.events.publish('setFilter', {});
  }

  get(query: string) {
    if(query==null) query=''
    return this.http.get(`${environment.apiUrl}products?search%5Bvalue%5D=${query}&start=${this.offset}&length=${this.limit}&sort=${this.sort}&direction=${this.direction}&priceMin=${this.priceMin}&priceMax=${this.priceMax}&category=${this.category}`);
  }

  getSalients(query: string) {
    return this.http.get(`${environment.apiUrl}products/salients`);
  }

  getSimilar(sku: string) {
    return this.http.get(`${environment.apiUrl}products/similar/${sku}`);
  }
  
  getOne(id: string) {
    return this.http.get(`${environment.apiUrl}products/${id}`).pipe(map((data:any) => {
      data.provider=(data.provider)?data.provider.id:'';
      return data;
    })
  );
  }
  getOneBySku(sku: string) {
    return this.http.get(`${environment.apiUrl}productsBySku/${sku}`);
  }
  getAll() {
    return this.http.get(`${environment.apiUrl}products?search%5Bvalue%5D=&start=0&length=-1&sort=name&direction=ASC`);
  }

  save(data:Products) {
    if(data.id !=='')
      return this.http.put(`${environment.apiUrl}products/${data.id}`, data);
    else
      return this.http.post(`${environment.apiUrl}products`, data);
  }
  delete(item:Products) {
    return this.http.delete(`${environment.apiUrl}products/${item.id}`);
  }
}
