import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ProductorService } from 'src/app/services/api/productor.service';
import { LoginService } from 'src/app/services/db/login.service';
import * as $ from 'jquery';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public form={
    email:'',
    password:''
  }
  constructor(
    private spinner: NgxSpinnerService,
    private router: Router,
    private productorService: ProductorService,
    private loginService:LoginService
    ) { }

  ngOnInit(): void {
  }

  save(form:NgForm){
    this.spinner.show();
    $(".text-danger").remove();
    this.productorService.login(this.form).subscribe(
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
      $("[name='"+key+"']").after('<div class="text-danger" style="padding-left:3rem">'+errors.errors[0]+'</div>');
  }
}
