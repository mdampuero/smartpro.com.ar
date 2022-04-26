import { Injectable } from '@angular/core';
import { environment } from "src/environments/environment";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { map } from "rxjs/operators";
import { EventsService } from '../events.service';
import { LoginService } from '../db/login.service';

@Injectable({
  providedIn: 'root'
})
export class SinistersService {
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

  get(query: string,productorId:string,status:String) {
    return this.http.get(`${environment.apiUrl}sinisters/ByProductor/${productorId}?search%5Bvalue%5D=${query}&start=${this.offset}&length=${this.limit}&sort=${this.sort}&direction=${this.direction}&status=${status}`);
  }

  getById(id: string) {
    return this.http.get(`${environment.apiUrl}sinisters/${id}`);
  }
  
  getOne(id: string) {
    return this.http.get(`${environment.apiUrl}sinisters/${id}`);
  }

  save(data:any) {
    data.user=this.loginService.user.name;
    data.productor=this.loginService.user.id;
    return this.http.post(`${environment.apiUrl}sinisters`, data);
  }
  delete(item:any) {
    return this.http.delete(`${environment.apiUrl}sinisters/${item.id}`);
  }
}
