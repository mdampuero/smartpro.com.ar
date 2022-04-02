import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ServicesService } from 'src/app/services/api/services.service';
import { LoginService } from 'src/app/services/db/login.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  public form={
    name:'',
    email:'',
    phone:'',
    query:''
  };
  constructor(
    public loginService:LoginService,
    public servicesService: ServicesService,
    private spinner: NgxSpinnerService,
    public toast:ToastService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.form.name=this.loginService.user.name;
    this.form.email=this.loginService.user.email;
    this.form.phone=this.loginService.user.phone;
  }

  save(form:NgForm){
    this.spinner.show();
    $(".form-control-feedback.text-danger").remove();
    console.log(this.form);
    
    this.servicesService.save(this.form).subscribe(
      () =>  {
        this.spinner.hide();
        this.router.navigate([`/home`]);
        this.toast.show('Muchas gracias, su consulta fue enviada correctamente, a la brevedad nos comunicaremos contigo.');
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
