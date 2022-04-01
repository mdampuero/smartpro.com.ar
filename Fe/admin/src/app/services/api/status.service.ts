import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EventsService } from '../events.service';
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class StatusService {

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
    return this.http.get(`${environment.apiUrl}sinisterStatus?search%5Bvalue%5D=${query}&start=${this.offset}&length=${this.limit}&sort=${this.sort}&direction=${this.direction}`);
  }
  
  getOne(id: string) {
    return this.http.get(`${environment.apiUrl}sinisterStatus/${id}`);
  }
  getAll() {
    return this.http.get(`${environment.apiUrl}sinisterStatus?search%5Bvalue%5D=&start=0&length=-1&sort=name&direction=ASC`);
  }
  save(data:any) {
    if(data.id !=='')
      return this.http.put(`${environment.apiUrl}sinisterStatus/${data.id}`, data);
    else
      return this.http.post(`${environment.apiUrl}sinisterStatus`, data);
  }
  delete(item:any) {
    return this.http.delete(`${environment.apiUrl}sinisterStatus/${item.id}`);
  }
}
