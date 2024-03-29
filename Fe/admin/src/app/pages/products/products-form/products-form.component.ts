import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ProductsService } from 'src/app/services/api/products.service';
import { ProvidersService } from 'src/app/services/api/providers.service';
import * as $ from 'jquery';
import {Router, ActivatedRoute} from '@angular/router';
import { Products } from 'src/app/models/products.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Providers } from 'src/app/models/providers.model';
import { EventsService } from 'src/app/services/events.service';
import { Editor, Toolbar } from 'ngx-editor';
import { Categories } from 'src/app/models/categories.model';
import { CategoriesService } from 'src/app/services/api/categories.service';
import { AngularEditorConfig } from '@kolkov/angular-editor';

@Component({
  selector: 'app-products-form',
  templateUrl: './products-form.component.html'
})
export class ProductsFormComponent implements OnInit {
  public htmlContent:any;
  editorConfig: AngularEditorConfig = {
    minHeight: '200px',
    editable: true,
    spellcheck: true,
    toolbarHiddenButtons: [
      [
        'subscript',
        'superscript',
        'heading',
        'fontName'
      ],
      [
        'fontSize',
        'textColor',
        'backgroundColor',
        'customClasses',
        'link',
        'unlink',
        'insertImage',
        'insertVideo',
        'insertHorizontalRule',
        'removeFormat',
        'toggleEditorMode'
      ]
    ]
  };

  public categorySelect=[];
  public form: Products={
    id:'',
    name:'',
    provider:'',
    sku:'',
    price:'',
    cost:'',
    brand:'',
    tags:'',
    description:'',
    descriptionLarge:'',
    picture:'',
    picturePreview:'',
    isSalient:0,
    stock:0,
    inStock:1,
    categories:[],
    userLastEdit:''
  };
 
  public providers: Providers[]=[];
  public categories: any[]=[];
  public titlePage:string='Nuevo';
  
  public breadcrumbs=[
    {url:'/inicio',title:'Inicio'},
    {url:'/products',title:'Productos'},
    {url:'',title:'Nuevo'}
  ];

  
  constructor(
    private spinner: NgxSpinnerService,
    private router: Router,
	  public events: EventsService,
    private _snackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute,
    public productsService: ProductsService,
    public providersService: ProvidersService,
    public categoriesService: CategoriesService,
    ) {
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
      this.providersService.getAll().subscribe((data:any) => this.providers=data.data);
      this.categoriesService.getAll().subscribe((data:any) => {
        this.categories=data.data;
        this.categories.forEach((myObject: any, index: any) => {
          myObject.checked=(this.form.categories.find( (category: any) => category.id === myObject.id ))?true:false;
        });
      });
    }

	getOne(id:string){
		this.spinner.show();
		this.productsService.getOne(id).subscribe(
		(data:any) => {
      if(!data.picturePreview)
        data.picturePreview='';
			this.form=data;
      this.loadForm();
      this.form.isSalient=(data.isSalient)?1:0;
      this.form.inStock=(data.inStock)?1:0;
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
  
  removeFile(){
    this.form.picture='##delete##';
    this.form.picturePreview='assets/images/no-photo.png';
  }

	save(form:NgForm){
    this.form.categories=[];
    this.categories.forEach((myObject: any, index: any) => {
      if(myObject.checked==true){
        this.form.categories.push(myObject.id);
      }
    });
		this.spinner.show();
		$(".form-control-feedback.text-danger").remove();
    // console.log(this.form);
    
    // return false;
		this.productsService.save(this.form).subscribe(
		(data:any) => {
			this._snackBar.open('Los cambios fueron guardados','Aceptar', { duration: 3000 });
			this.router.navigate(['/products']);
			// if(this.activatedRoute.snapshot.paramMap.get('id'))
			// else
			// this.router.navigate([`/products/photos/${data.id}`]);
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
