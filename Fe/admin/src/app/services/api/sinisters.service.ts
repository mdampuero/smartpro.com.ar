import { Injectable } from '@angular/core';
import { environment } from "src/environments/environment";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { map } from "rxjs/operators";
import { Sinisters } from 'src/app/models/sinisters.model';
import { EventsService } from '../events.service';

@Injectable({
  providedIn: 'root'
})
export class SinistersService {
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
    return this.http.get(`${environment.apiUrl}sinisters?search%5Bvalue%5D=${query}&start=${this.offset}&length=${this.limit}&sort=${this.sort}&direction=${this.direction}`);
  }

  getById(id: string) {
    return this.http.get(`${environment.apiUrl}sinisters/${id}`);
  }
  
  getOne(id: string) {
    return this.http.get(`${environment.apiUrl}sinisters/${id}`).pipe(map((data:any) => {
      data.productor=(data.productor)?data.productor.id:'';
      data.company=(data.company)?data.company.id:'';
      return data;
    })
  );
  }

  getAll() {
    return this.http.get(`${environment.apiUrl}sinisters?search%5Bvalue%5D=&start=0&length=-1&sort=name&direction=ASC`);
  }
  save(data:Sinisters) {
    if(data.id !=='')
      return this.http.put(`${environment.apiUrl}sinisters/${data.id}`, data);
    else
      return this.http.post(`${environment.apiUrl}sinisters`, data);
  }
  delete(item:Sinisters) {
    return this.http.delete(`${environment.apiUrl}sinisters/${item.id}`);
  }
}
