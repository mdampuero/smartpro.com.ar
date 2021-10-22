import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ProductsService } from 'src/app/services/api/products.service';
import { EventsService } from 'src/app/services/events.service';

@Component({
  selector: 'app-products-update',
  templateUrl: './products-update.component.html',
  styleUrls: ['./products-update.component.css']
})
export class ProductsUpdateComponent implements OnInit {
  public titlePage:string='Actualizar precios';
  public fileBase64:any;
  public breadcrumbs=[
    {url:'/inicio',title:'Inicio'},
    {url:'/products',title:'Productos'},
    {url:'',title:'Actualizar precios'}
  ];
  constructor(private spinner: NgxSpinnerService,
    private router: Router,
	  public events: EventsService,
    private _snackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute,
    public productsService: ProductsService) { }

  ngOnInit(): void {
    this.events.subscribe('app-input-file', (data: any) => {
			this.fileBase64=data.base64;
		});
  }

  save(form:NgForm){
    this.spinner.show();
		$(".form-control-feedback.text-danger").remove();
		this.productsService.updatePrice({file:this.fileBase64}).subscribe(
		(data:any) => {
			this._snackBar.open('Los cambios fueron guardados','Aceptar', { duration: 3000 });
			this.router.navigate(['/products']);
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
