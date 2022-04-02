import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import * as $ from 'jquery';
import {Router, ActivatedRoute} from '@angular/router';
import { Pages } from 'src/app/models/pages.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PagesService } from 'src/app/services/api/pages.service';
import { AngularEditorConfig } from '@kolkov/angular-editor';

@Component({
  selector: 'app-pages-form',
  templateUrl: './pages-form.component.html'
})
export class PagesFormComponent implements OnInit {
  public form: Pages={
    id:'',
    name:'',
    content:''
  };
  public htmlContent:any;
  editorConfig: AngularEditorConfig = {
    minHeight: '200px',
    editable: true,
    spellcheck: true,
    toolbarHiddenButtons: [
      [
        'subscript',
        'superscript',
        'fontName',
      ],
      [
        'fontSize',
        'textColor',
        'backgroundColor',
        'customClasses',
        'insertImage',
        'insertVideo',
        'insertHorizontalRule',
        'removeFormat'
      ]
    ]
  };
  public titlePage:string='Nuevo';

  public breadcrumbs=[
    {url:'/inicio',title:'Inicio'},
    {url:'/pages',title:'Paǵinas'},
    {url:'',title:'Nuevo'}
  ];

  constructor(
    private spinner: NgxSpinnerService,
    private router: Router,
    private _snackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute,
    public pagesService: PagesService) {
      let id=this.activatedRoute.snapshot.paramMap.get('id');
      if(id){
        this.getOne(id);
        this.breadcrumbs[(this.breadcrumbs.length - 1 )].title='Editar';
        this.titlePage='Editar';
      }
    }

  getOne(id:string){
    this.spinner.show();
    this.pagesService.getOne(id).subscribe(
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
    this.pagesService.save(this.form).subscribe(
      (data:any) => {
        this._snackBar.open('Los cambios fueron guardados','Aceptar', { duration: 3000 });
        this.router.navigate(['/pages']);
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
