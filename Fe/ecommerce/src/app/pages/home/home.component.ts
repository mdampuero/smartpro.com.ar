import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/api/products.service';
import { LoginService } from 'src/app/services/db/login.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public salients:any=[];
  public query:string='';
  constructor(public loginService:LoginService,private spinner: NgxSpinnerService,public productsService: ProductsService,) { }

  ngOnInit(): void {
    this.getResult();
  }

  search(){
    this.productsService.offset=0;
    this.getResult();
  }

  getResult(){
    this.productsService.getSalients(this.query).subscribe(
      (data:any) => this.salients=data,
      (error) => {},
      () => {}
    );
  }

}
