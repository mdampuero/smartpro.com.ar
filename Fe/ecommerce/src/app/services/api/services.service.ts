import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  constructor(private http: HttpClient) { 

  }

  save(data:any) {
    return this.http.post(`${environment.apiUrl}services/contact`, data);
  }

  getAbout(id:string) {
    return this.http.get(`${environment.apiUrl}pages/${id}`);
  }
}
