import { Injectable } from '@angular/core';
import { environment } from "src/environments/environment";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { map } from "rxjs/operators";
import { EventsService } from '../events.service';

@Injectable({
  providedIn: 'root'
})
export class LocalitiesService {
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
    return this.http.get(`${environment.apiUrl}localities?search%5Bvalue%5D=${query}&start=${this.offset}&length=${this.limit}&sort=${this.sort}&direction=${this.direction}`);
  }
  
  getOne(id: string) {
    return this.http.get(`${environment.apiUrl}localities/${id}`);
  }
  getAll() {
    return this.http.get(`${environment.apiUrl}localities?search%5Bvalue%5D=&start=0&length=-1&sort=name&direction=ASC`);
  }
  getByProvence(provence:string) {
    return this.http.get(`${environment.apiUrl}localities/provence/${provence}`);
  }
  save(data:any) {
    if(data.id !=='')
      return this.http.put(`${environment.apiUrl}localities/${data.id}`, data);
    else
      return this.http.post(`${environment.apiUrl}localities`, data);
  }
  delete(item:any) {
    return this.http.delete(`${environment.apiUrl}localities/${item.id}`);
  }
}
