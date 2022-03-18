import { Injectable } from '@angular/core';
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { LoginService } from '../db/login.service';

@Injectable({
  providedIn: 'root'
})
export class ProductorService {

  constructor(private http: HttpClient,public loginService:LoginService) { }

  login(data:any) {
    return this.http.post(`${environment.apiUrl}productors/login`, data);
  }

  getAll() {
    return this.http.get(`${environment.apiUrl}productorsByCompany/${this.loginService.user.company.id}`);
  }
}
