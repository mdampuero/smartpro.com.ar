import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { CustomerService } from 'src/app/services/api/customer.service';
import { LocalitiesService } from 'src/app/services/api/localities.service';
import { OrderService } from 'src/app/services/api/orders.service';
import { ProvencesService } from 'src/app/services/api/provences.service';
import { LoginService } from 'src/app/services/db/login.service';
import { ToastService } from 'src/app/services/toast.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  public remaind:any
  public loadingLocalities=true;
  public provences: any[]=[];
  public localities: any[]=[];
  public form={
    provence:'',
    locality:''
  }
  constructor(
    public localitiesService: LocalitiesService,
    public provencesService: ProvencesService,public toast:ToastService,private router: Router,public loginService:LoginService,private spinner: NgxSpinnerService,private customerService:CustomerService,private ordersService:OrderService) { }
  ngOnInit(): void { 
    if(this.loginService.user.cart.items.length == 0){
      this.router.navigate(['/home']);
    }
    this.provencesService.getAll().subscribe((data:any) => {
      this.provences=data.data;
      this.form.provence=this.loginService.user.provence.id;
      this.onChange(true);      
    });
    this.remaind=this.loginService.user.balance - this.loginService.user.cart.total;
  }
  onChange(selected:boolean) {
    this.loadingLocalities=true;
    this.localitiesService.getByProvence(this.form.provence).subscribe((data:any) => {
      this.localities=data;
      if(selected)
        this.form.locality=this.loginService.user.locality.id;
      this.loadingLocalities=false;
    });
  }
  save(form:NgForm){
    this.spinner.show();
    $(".form-control-feedback.text-danger").remove();
    this.loginService.user.provence=this.form.provence;
    this.loginService.user.locality=this.form.locality;
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
        this.loginService.logout();
        Swal.fire({
          icon: 'success',
          allowOutsideClick: false,
          focusConfirm: false,
          title: '¡Felicitaciones!',
          text: 'Hemos recibido tu pedido Nº #'+data.id+' y ya lo estamos preparando, te notificaremos por email cuando lo despachemos.',
          footer: 'Si tienes alguna pregunta, puedes escribirnos &nbsp;<a href="mailto:hola@smartpro.com.ar">aquí </a>',
          confirmButtonText: 'Aceptar',
        }).then((result) => {
          if (result.isConfirmed) {
            location.href='/login';
          }
        })
      },
      (error) => {
        if(error.status==400)
          Object.entries(error.error.form.errors.children).forEach(
            ([key, value]) => this.callback(key,value)
          );
         this.toast.show('UPS! Algo no salió bien');
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
