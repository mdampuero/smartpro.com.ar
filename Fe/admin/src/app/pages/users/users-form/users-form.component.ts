import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { UsersService } from 'src/app/services/api/users.service';
import * as $ from 'jquery';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { Users } from 'src/app/models/users.model';
@Component({
  selector: 'app-users-form',
  templateUrl: './users-form.component.html'
})
export class UsersFormComponent implements OnInit {
  public form: Users={
    id:'',
    name:'',
    email:'',
    password:'',
    passwordRepeat:'',
    plainPassword:{},
    role:'',
    isActive:1
  };
  public roles=[
    'ROLE_SUPER',
    'ROLE_ADMIN',
    'ROLE_OPER'
  ];
  public titlePage:string='Nuevo';

  public breadcrumbs=[
    {url:'/inicio',title:'Inicio'},
    {url:'/usuarios',title:'Usuarios'},
    {url:'',title:'Nuevo'}
  ];

  constructor(
    private spinner: NgxSpinnerService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public usersService: UsersService) { 
      let id=this.activatedRoute.snapshot.paramMap.get('id');
      if(id){
        this.getOne(id);
        this.breadcrumbs[(this.breadcrumbs.length - 1 )].title='Editar';
        this.titlePage='Editar';
      }
    }

  getOne(id:string){
    this.spinner.show();
    this.usersService.getOne(id).subscribe(
      (data:any) => {
        this.form=data;
        this.form.isActive=(data.isActive)?1:0;
        this.spinner.hide();
      },
      (error) => {
        this.spinner.hide();
      }
    );
  }

  ngOnInit(): void {
    
  }

  save(form:NgForm){
    this.spinner.show();
    $(".form-control-feedback.text-danger").remove();
    this.usersService.save(this.form).subscribe(
      (data:any) => {
        this.router.navigate(['/usuarios']);
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
    if(key=='plainPassword' && errors.children != "undefined"){
      if(typeof errors.children.first.errors != "undefined")
        $("[name='password']").after('<small class="form-control-feedback text-danger">'+errors.children.first.errors[0]+'</small>');
      if(typeof errors.children.second.errors != "undefined")
        $("[name='password']").after('<small class="form-control-feedback text-danger">'+errors.children.second.errors[0]+'</small>');
    }
    if(typeof errors.errors != "undefined"){
      $("[name='"+key+"']").after('<small class="form-control-feedback text-danger">'+errors.errors[0]+'</small>');
    }
  }

}
