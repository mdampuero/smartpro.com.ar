import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';

import * as $ from 'jquery';
import {Router, ActivatedRoute} from '@angular/router';
import { Sliders } from 'src/app/models/sliders.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SlidersService } from 'src/app/services/api/sliders.service';
import { EventsService } from 'src/app/services/events.service';
@Component({
  selector: 'app-sliders-form',
  templateUrl: './sliders-form.component.html'
})
export class SlidersFormComponent implements OnInit {
  public form: Sliders={
    id:'',
    title:'',
    subtitle:'',
    picture:'',
    picturePreview:'',
    link:'',
    description:''
  };
  public titlePage:string='Nuevo';

  public breadcrumbs=[
    {url:'/inicio',title:'Inicio'},
    {url:'/sliders',title:'Sliders'},
    {url:'',title:'Nuevo'}
  ];

  constructor(
    private spinner: NgxSpinnerService,
    private router: Router,
    public events: EventsService,
    private _snackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute,
    public slidersService: SlidersService) {
      let id=this.activatedRoute.snapshot.paramMap.get('id');
      if(id){
        this.getOne(id);
        this.breadcrumbs[(this.breadcrumbs.length - 1 )].title='Editar';
        this.titlePage='Editar';
      }
    }

  getOne(id:string){
    this.spinner.show();
    this.slidersService.getOne(id).subscribe(
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
    this.events.subscribe('app-input-file', (data: any) => {
			this.form.picture=data.base64;
			this.form.picturePreview=data.base64;
		});
  }

  save(form:NgForm){
    this.spinner.show();
    $(".form-control-feedback.text-danger").remove();
    this.slidersService.save(this.form).subscribe(
      (data:any) => {
        this._snackBar.open('Los cambios fueron guardados','Aceptar', { duration: 3000 });
        this.router.navigate(['/sliders']);
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

  ngOnDestroy(){
    this.events.destroy('app-input-file');
  }

}
