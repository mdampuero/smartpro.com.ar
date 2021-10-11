import { Injectable } from '@angular/core';
import { environment } from "src/environments/environment";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { map } from "rxjs/operators";
import { EventsService } from '../events.service';

@Injectable({
  providedIn: 'root'
})
export class LogsService {
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
    return this.http.get(`${environment.apiUrl}logs?search%5Bvalue%5D=${query}&start=${this.offset}&length=${this.limit}&sort=${this.sort}&direction=${this.direction}`);
  }
  
  getOne(id: string) {
    return this.http.get(`${environment.apiUrl}logs/${id}`);
  }
  getAll() {
    return this.http.get(`${environment.apiUrl}logs?search%5Bvalue%5D=&start=0&length=-1&sort=name&direction=ASC`);
  }
  getByResource(resource:string) {
      return this.http.get(`${environment.apiUrl}logs/resource/${resource}`).pipe(map((data:any) => {
        data.forEach((myObject: any, index: any) => {
            myObject.inverse=((index%2)==0)?false:true;
        });
        return data;
        })
    );
  }
  
  save(data:any) {
    return this.http.post(`${environment.apiUrl}logs`, data).pipe(map((data:any) => {
        data.forEach((myObject: any, index: any) => {
            myObject.inverse=((index%2)==0)?false:true;
        });
        return data;
        })
    );
  }
  delete(item:any) {
    return this.http.delete(`${environment.apiUrl}logs/${item.id}`);
  }
}
