import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ProductorsService } from 'src/app/services/api/productors.service';
import * as $ from 'jquery';
import {Router, ActivatedRoute} from '@angular/router';
import { Productors } from 'src/app/models/productors.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Companies } from 'src/app/models/companies.model';
import { CompaniesService } from 'src/app/services/api/companies.service';

@Component({
  selector: 'app-productors-form',
  templateUrl: './productors-form.component.html'
})
export class ProductorsFormComponent implements OnInit {
  public form: Productors={
    id:'',
    company:'',
    name:'',
    email:'',
    isSuper:0,
    phone:'',
    password:'',
    observation:'',
  };
  public titlePage:string='Nuevo';
  public companies: Companies[]=[];
  public breadcrumbs=[
    {url:'/inicio',title:'Inicio'},
    {url:'/productors',title:'Analistas de siniestros'},
    {url:'',title:'Nuevo'}
  ];

  constructor(
    private spinner: NgxSpinnerService,
    private router: Router,
    public companiesService: CompaniesService,
    private _snackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute,
    public productorsService: ProductorsService) {
      let id=this.activatedRoute.snapshot.paramMap.get('id');
      if(id){
        this.getOne(id);
        this.breadcrumbs[(this.breadcrumbs.length - 1 )].title='Editar';
        this.titlePage='Editar';
      }else{
        this.loadForm();
      }
    }

    loadForm(){
      this.companiesService.getAll().subscribe((data:any) => this.companies=data.data);
    }
    getOne(id:string){
      this.spinner.show();
      this.productorsService.getOne(id).subscribe(
        (data:any) => {
          this.form=data;
          if(data.company)
            this.form.company=data.company.id;
          this.form.isSuper=(data.isSuper)?1:0;
          this.loadForm();
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
    this.productorsService.save(this.form).subscribe(
      (data:any) => {
        this._snackBar.open('Los cambios fueron guardados','Aceptar', { duration: 3000 });
        this.router.navigate(['/productors']);
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
