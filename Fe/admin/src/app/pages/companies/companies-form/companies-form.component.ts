import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import * as $ from 'jquery';
import {Router, ActivatedRoute} from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Companies } from 'src/app/models/companies.model';
import { CompaniesService } from 'src/app/services/api/companies.service';

@Component({
  selector: 'app-companies-form',
  templateUrl: './companies-form.component.html'
})
export class CompaniesFormComponent implements OnInit {
  public form: Companies={
    id:'',
    name:'',
    email:'',
    phone:'',
    observation:'',
  };
  public titlePage:string='Nuevo';

  public breadcrumbs=[
    {url:'/inicio',title:'Inicio'},
    {url:'/companies',title:'Compañias de seguros'},
    {url:'',title:'Nuevo'}
  ];

  constructor(
    private spinner: NgxSpinnerService,
    private router: Router,
    private _snackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute,
    public companiesService: CompaniesService) {
      let id=this.activatedRoute.snapshot.paramMap.get('id');
      if(id){
        this.getOne(id);
        this.breadcrumbs[(this.breadcrumbs.length - 1 )].title='Editar';
        this.titlePage='Editar';
      }
    }

  getOne(id:string){
    this.spinner.show();
    this.companiesService.getOne(id).subscribe(
      (data:any) => {
        this.form=data;
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
    this.companiesService.save(this.form).subscribe(
      (data:any) => {
        this._snackBar.open('Los cambios fueron guardados','Aceptar', { duration: 3000 });
        this.router.navigate(['/companies']);
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
