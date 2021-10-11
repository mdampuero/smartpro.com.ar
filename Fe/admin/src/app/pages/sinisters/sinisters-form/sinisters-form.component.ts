import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import * as $ from 'jquery';
import {Router, ActivatedRoute} from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Sinisters } from 'src/app/models/sinisters.model';
import { SinistersService } from 'src/app/services/api/sinisters.service';
import { Productors } from 'src/app/models/productors.model';
import { Companies } from 'src/app/models/companies.model';
import { ProductorsService } from 'src/app/services/api/productors.service';
import { CompaniesService } from 'src/app/services/api/companies.service';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import { ProvencesService } from 'src/app/services/api/provences.service';
import { LocalitiesService } from 'src/app/services/api/localities.service';

@Component({
  selector: 'app-sinisters-form',
  templateUrl: './sinisters-form.component.html'
})
export class SinistersFormComponent implements OnInit {
  model: NgbDateStruct | undefined;
  public dp={year:"2021", month:"09",day:"12"};
  public loadingLocalities=false;
  public form: Sinisters={
    id:'',
    number:'',
    amount:'',
    amountRepeat:'',
    date:'',
    productor:'',
    company:'',
    name:'',
    document:'',
    email:'',
    phone:'',
    observations:'',
    provence:'',
    locality:'',
    street:'',
    streetNumber:'',
    department:'',
    postalCode:'',
    floor:''
  };
  public productors: Productors[]=[];
  public companies: Companies[]=[];
  public provences: any[]=[];
  public localities: any[]=[];
  public titlePage:string='Nuevo';

  public breadcrumbs=[
    {url:'/inicio',title:'Inicio'},
    {url:'/sinisters',title:'Siniestros'},
    {url:'',title:'Nuevo'}
  ];

  constructor(
    private spinner: NgxSpinnerService,
    private router: Router,
    private _snackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute,
    public productorsService: ProductorsService,
    public companiesService: CompaniesService,
    public provencesService: ProvencesService,
    public localitiesService: LocalitiesService,
    public sinistersService: SinistersService) {
      let id=this.activatedRoute.snapshot.paramMap.get('id');
      this.loadForm();
      if(id){
        this.getOne(id);
        this.breadcrumbs[(this.breadcrumbs.length - 1 )].title='Editar';
        this.titlePage='Editar';
      }
    }

  loadForm(){
    this.productorsService.getAll().subscribe((data:any) => this.productors=data.data);
    this.companiesService.getAll().subscribe((data:any) => this.companies=data.data);
    this.provencesService.getAll().subscribe((data:any) => this.provences=data.data);
  }
  onChange() {
    this.loadingLocalities=true;
    this.form.locality='';
    this.localitiesService.getByProvence(this.form.provence).subscribe((data:any) => {
      this.localities=data;
      this.loadingLocalities=false;
    });
  }
  getOne(id:string){
    this.spinner.show();
    this.sinistersService.getOne(id).subscribe(
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
    this.form.date=`${this.dp.year}-${this.dp.month}-${this.dp.day}`;
    this.sinistersService.save(this.form).subscribe(
      (data:any) => {
        this._snackBar.open('Los cambios fueron guardados','Aceptar', { duration: 3000 });
        this.router.navigate(['/sinisters']);
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
