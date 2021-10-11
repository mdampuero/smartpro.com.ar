import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { CustomerService } from 'src/app/services/api/customer.service';
import { LocalitiesService } from 'src/app/services/api/localities.service';
import { ProvencesService } from 'src/app/services/api/provences.service';
import { LoginService } from 'src/app/services/db/login.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  public menu=1;
  public loadingLocalities=true;
  public form={
    provence:'',
    locality:''
  }
  public provences: any[]=[];
  public localities: any[]=[];
  constructor(public loginService:LoginService,
    public localitiesService: LocalitiesService,
    public provencesService: ProvencesService,public toast:ToastService, private spinner: NgxSpinnerService,private customerService:CustomerService) { }

  ngOnInit(): void {
    this.provencesService.getAll().subscribe((data:any) => {
      this.provences=data.data;
      this.form.provence=this.loginService.user.provence.id;
      this.onChange(true);      
    });
    
  }
  
  go(menu:any){
    this.menu=menu;
  }

  onChange(selected:boolean) {
    this.loadingLocalities=true;
    this.form.locality='';
    this.localitiesService.getByProvence(this.form.provence).subscribe((data:any) => {
      this.localities=data;
      if(selected)
        this.form.locality=this.loginService.user.locality.id;
      this.loadingLocalities=false;
    });
  }

  logout(){
    this.loginService.logout();
    location.href='/login'
  }

  save(){
    this.spinner.show();
    $(".form-control-feedback.text-danger").remove();
    this.loginService.user.provence=this.form.provence;
    this.loginService.user.locality=this.form.locality;
    this.customerService.save(this.loginService.user).subscribe(
      (data) =>  {
        this.spinner.hide();
        this.loginService.user=data;
        this.loginService.saveStorage();
        this.toast.show('Los cambios se guardaron correctamente');
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
