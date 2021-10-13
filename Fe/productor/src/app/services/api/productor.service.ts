import { Injectable } from '@angular/core';
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ProductorService {

  constructor(private http: HttpClient) { }

  login(data:any) {
    return this.http.post(`${environment.apiUrl}productors/login`, data);
  }
}
