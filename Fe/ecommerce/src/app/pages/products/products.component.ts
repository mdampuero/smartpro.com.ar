import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ProductsService } from 'src/app/services/api/products.service';
import { EventsService } from 'src/app/services/events.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
	public data:any={data:[]};
	public page=0;
	public query:any;
	public order=0;
	public orders=[
		{ label: 'Nombre', sort:'name', direction:'ASC'},
		{ label: 'Recomendado', sort:'isSalient', direction:'DESC'},
		{ label: 'Menor precio', sort:'price', direction:'ASC'},
		{ label: 'Mayor precio', sort:'price', direction:'DESC'}
	]
	constructor(public productsService: ProductsService,private spinner: NgxSpinnerService,private activatedRoute: ActivatedRoute,public events: EventsService) { 
		this.query=this.activatedRoute.snapshot.paramMap.get('query');
		this.events.subscribe('searchInput', (data: any) => {
			this.query=data.query;
			this.page=0;
			this.getResult();
		});
		this.events.subscribe('filter', (data: any) => {
			this.productsService.priceMin=data.filter.priceMin;			
			this.productsService.priceMax=data.filter.priceMax;		
			this.productsService.category=data.filter.category;
			this.page=0;
			this.getResult();
		});
	}

	ngOnInit(): void {
		this.getResult();
	}

	orderBy(){
		this.productsService.sort=this.orders[this.order].sort;
		this.productsService.direction=this.orders[this.order].direction;
		this.page=0;
		this.getResult();
	}

	getResult(){
		this.spinner.show();
		this.productsService.offset=this.page*this.productsService.limit;
		this.productsService.get(this.query).subscribe(
			(data:any) => {
				if(this.page>0){
					this.data.data.push(...data["data"]);
				}else{
					this.data=data
				}
			},
			(error) => this.spinner.hide(),
			() => this.spinner.hide()
		);
	}

	ngOnDestroy(){
		this.events.destroy('searchInput');
		this.events.destroy('filter');
	}

	nextPage(){
		this.page++;
		this.getResult();
	}

}
