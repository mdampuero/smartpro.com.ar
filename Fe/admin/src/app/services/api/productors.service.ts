import { Injectable } from '@angular/core';
import { environment } from "src/environments/environment";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { map } from "rxjs/operators";
import { Productors } from 'src/app/models/productors.model';
import { EventsService } from '../events.service';

@Injectable({
  providedIn: 'root'
})
export class ProductorsService {
  public limit = 30;
  public offset = 0;
  public sort = "createdAt";
  public direction = "DESC";

  constructor(private http: HttpClient,public events: EventsService) { 

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
    return this.http.get(`${environment.apiUrl}productors?search%5Bvalue%5D=${query}&start=${this.offset}&length=${this.limit}&sort=${this.sort}&direction=${this.direction}`);
  }
  
  getAll() {
    return this.http.get(`${environment.apiUrl}productors?search%5Bvalue%5D=&start=0&length=-1&sort=name&direction=ASC`);
  }

  getOne(id: string) {
    return this.http.get(`${environment.apiUrl}productors/${id}`);
  }

  save(data:Productors) {
    if(data.id !=='')
      return this.http.put(`${environment.apiUrl}productors/${data.id}`, data);
    else
      return this.http.post(`${environment.apiUrl}productors`, data);
  }
  delete(item:Productors) {
    return this.http.delete(`${environment.apiUrl}productors/${item.id}`);
  }
}
