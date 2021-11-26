import { Component, Input, OnInit } from '@angular/core';
import { Observable, OperatorFunction } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { ProductsService } from 'src/app/services/api/products.service';
import { ProvidersService } from '../../services/api/providers.service';
import { MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { EventsService } from 'src/app/services/events.service';
export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY'
  },
};

@Component({
  selector: 'app-form-product-sinister',
  templateUrl: './form-product-sinister.component.html',
  styleUrls: ['./form-product-sinister.component.css'],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'es-ES' },
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }
  ]
})
export class FormProductSinisterComponent implements OnInit {
  productsList = [{ name: '', id: '' }];
  providersList: any;
  departureDate:any;
  arrivalDate:any;
  product:any;
  constructor(
    public productsService: ProductsService,
    public events: EventsService,
    public providersService: ProvidersService
  ) {
    this.productsService.getList().subscribe((data: any) => this.productsList = data.data);
    this.providersService.getAll().subscribe((data: any) => this.providersList = data.data);
  }

  ngOnInit(): void {
    this.initObject();
  }

  initObject(){
    this.product = {
      name: '',
      id: '',
      cost: '',
      price: '',
      amount: '',
      bill_number: '',
      provider: '',
      providerName: '',
      transport: '',
      departureDate: '',
      arrivalDate: '',
    };
  }
  search: OperatorFunction<string, readonly { name: any, id: any }[]> = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      map(term => term === '' ? []
        : this.productsList.filter(v => v.name.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    )

  selectedItem(item:any) { }
  formatter = (x: { name: string }) => x.name;

  addProduct(){
    if(this.product.id!=''){
      let providerSelected=this.providersList.filter((v: { id: any; })=>v.id==this.product.provider);
      this.product.providerName=providerSelected[0].name;    
      if(this.departureDate) 
        this.product.departureDate=this.departureDate.format('DD/MM/YYYY');
      if(this.arrivalDate) 
      this.product.arrivalDate=this.arrivalDate.format('DD/MM/YYYY');
      this.events.publish('app-form-product-sinister', {
        product: this.product,
      });
      this.initObject();
    }
  }
}
