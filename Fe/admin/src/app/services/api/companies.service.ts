import { Injectable } from '@angular/core';
import { environment } from "src/environments/environment";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { map } from "rxjs/operators";
import { Companies } from 'src/app/models/companies.model';
import { EventsService } from '../events.service';

@Injectable({
  providedIn: 'root'
})
export class CompaniesService {
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
    return this.http.get(`${environment.apiUrl}companies?search%5Bvalue%5D=${query}&start=${this.offset}&length=${this.limit}&sort=${this.sort}&direction=${this.direction}`);
  }
  
  getOne(id: string) {
    return this.http.get(`${environment.apiUrl}companies/${id}`);
  }
  getAll() {
    return this.http.get(`${environment.apiUrl}companies?search%5Bvalue%5D=&start=0&length=-1&sort=name&direction=ASC`);
  }
  save(data:Companies) {
    if(data.id !=='')
      return this.http.put(`${environment.apiUrl}companies/${data.id}`, data);
    else
      return this.http.post(`${environment.apiUrl}companies`, data);
  }
  delete(item:Companies) {
    return this.http.delete(`${environment.apiUrl}companies/${item.id}`);
  }
}
