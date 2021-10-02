import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { CustomerService } from 'src/app/services/api/customer.service';
import { OrderService } from 'src/app/services/api/orders.service';
import { LoginService } from 'src/app/services/db/login.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  constructor(private router: Router,public loginService:LoginService,private spinner: NgxSpinnerService,private customerService:CustomerService,private ordersService:OrderService) { }
  ngOnInit(): void { 
    if(this.loginService.user.cart.items.length == 0){
      this.router.navigate(['/home']);
    }
  }

  save(form:NgForm){
    this.spinner.show();
    $(".form-control-feedback.text-danger").remove();
    this.customerService.save(this.loginService.user).subscribe(
      () =>  this.saveOrder(),
      (error) => {
        if(error.status==400)
          Object.entries(error.error.form.errors.children).forEach(
            ([key, value]) => this.callback(key,value)
          );
        this.spinner.hide();
      }
    );
  }

  

  saveOrder(){
    $(".form-control-feedback.text-danger").remove();
    this.ordersService.save({ customer:this.loginService.user.id,total:this.loginService.user.cart.total, cart:this.loginService.user.cart}).subscribe(
      (data:any) => {
        this.loginService.user={};
        this.loginService.saveStorage();
        this.router.navigate(['/finalizado']);
      },
      (error) => {
        if(error.status==400)
          Object.entries(error.error.form.errors.children).forEach(
            ([key, value]) => this.callback(key,value)
          );
        this.spinner.hide();
      },
      ()=> this.spinner.hide()
    );
  }

  callback(key:string,errors:any){
    if(typeof errors.errors != "undefined")
      $("[name='"+key+"']").after('<small class="form-control-feedback text-danger">'+errors.errors[0]+'</small>');
  }

}
