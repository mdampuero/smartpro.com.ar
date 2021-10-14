import { Injectable } from '@angular/core';
import { environment } from "src/environments/environment";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { map } from "rxjs/operators";
import { Sliders } from 'src/app/models/sliders.model';
import { EventsService } from '../events.service';

@Injectable({
  providedIn: 'root'
})
export class SlidersService {
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
    return this.http.get(`${environment.apiUrl}sliders?search%5Bvalue%5D=${query}&start=${this.offset}&length=${this.limit}&sort=${this.sort}&direction=${this.direction}`);
  }
  
  getOne(id: string) {
    return this.http.get(`${environment.apiUrl}sliders/${id}`).pipe(map((data:any) => {
      if(data.picture){
        data.picturePreview=environment.imgUrl.md+data.picture;
        data.picture=null;
      }
      return data;
    })
  );
  }
  getAll() {
    return this.http.get(`${environment.apiUrl}slidersRand`);
  }
  save(data:Sliders) {
    if(data.id !=='')
      return this.http.put(`${environment.apiUrl}sliders/${data.id}`, data);
    else
      return this.http.post(`${environment.apiUrl}sliders`, data);
  }
  delete(item:Sliders) {
    return this.http.delete(`${environment.apiUrl}sliders/${item.id}`);
  }
}
