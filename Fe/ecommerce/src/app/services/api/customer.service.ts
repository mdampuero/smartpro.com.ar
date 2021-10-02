import { Injectable } from '@angular/core';
import { environment } from "src/environments/environment";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { map } from "rxjs/operators";
import { Login } from 'src/app/models/login.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  public limit = 30;
  public offset = 0;
  public sort = "createdAt";
  public direction = "DESC";

  constructor(private http: HttpClient) { 

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
  }

  get(query: string) {
    return this.http.get(`${environment.apiUrl}demos?search%5Bvalue%5D=${query}&start=${this.offset}&length=${this.limit}&sort=${this.sort}&direction=${this.direction}`);
  }  
  
  getOne(id: string) {
    return this.http.get(`${environment.apiUrl}demos/${id}`);
  }
  
  getAll() {
    return this.http.get(`${environment.apiUrl}demos?search%5Bvalue%5D=&start=0&length=-1&sort=name&direction=ASC`);
  }

  login(data:Login) {
    return this.http.post(`${environment.apiUrl}customers/login`, data);
  }
  save(data:any) {
    if(data.id !=='')
      return this.http.put(`${environment.apiUrl}customers/${data.id}`, data);
    else
      return this.http.post(`${environment.apiUrl}customers`, data);
  }
  // delete(item:Demo) {
  //   return this.http.delete(`${environment.apiUrl}demos/${item.id}`);
  // }
}
