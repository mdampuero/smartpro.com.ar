import { Component, OnInit } from '@angular/core';
import { Login } from 'src/app/models/login.model';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { CustomerService } from 'src/app/services/api/customer.service';
import * as $ from 'jquery';
import { LoginService } from 'src/app/services/db/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public form: Login={
    username:'',
    password:'',
    name:''
  };
  constructor(
    private spinner: NgxSpinnerService,
    private router: Router,
    private loginService:LoginService,
    private customerService:CustomerService
  ) { }

  ngOnInit(): void {
  }

  save(form:NgForm){
    this.spinner.show();
    $(".form-control-feedback.text-danger").remove();
    this.customerService.login(this.form).subscribe(
      (data:any) => {
        this.loginService.login(data);
        this.router.navigate(['/']);
        this.spinner.hide();
      },
      (error) => {
        if(error.status==400)
          Object.entries(error.error.form.errors.children).forEach(
            ([key, value]) => this.callback(key,value)
          );
        this.spinner.hide();
      }
    );
  }

  callback(key:string,errors:any){
    if(typeof errors.errors != "undefined")
      $("[name='"+key+"']").after('<small class="form-control-feedback text-danger">'+errors.errors[0]+'</small>');
  }
}
