import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { SinistersService } from 'src/app/services/api/sinisters.service';
import { ProductsService } from 'src/app/services/api/products.service';
import { EventsService } from 'src/app/services/events.service';

/***
 * NEED_TO_DEFINE_PRODUCTS
 WAITING_FOR_PRODUCTS
 UNDELIVERED
 DELIVERED
 INVOICED
 DISCHARDGED
 */
@Component({
  selector: 'app-sinister-status',
  templateUrl: './sinister-status.component.html',
  styleUrls: ['./sinister-status.component.css']
})
export class SinisterStatusComponent implements OnInit {
  public newStatusSelect:any=-1;
  public productList:any=[];
  public id:any;
  public active:string | undefined;
  public data:any;
  observations:any;
  public breadcrumbs=[
    { url:'/inicio',title:'Inicio'},
    { url:'/sinisters',title:'Siniestros'},
    { url:'',title:''},
    { url:'',title:'Cambiar estado'},
  ];
  public status=[
    { id:'NEED_TO_DEFINE_PRODUCTS',disabled:false, label:'Falta definir productos'},
    { id:'WAITING_FOR_PRODUCTS',disabled:false, label:'En espera de productos'},
    { id:'UNDELIVERED',disabled:false, label:'Ingresado sin entregar'},
    { id:'DELIVERED',disabled:false, label:'Entregado'},
    { id:'INVOICED',disabled:false, label:'Facturado'},
    { id:'DISCHARDGED',disabled:false, label:'Dado de baja'},
  ];
  constructor(private spinner: NgxSpinnerService,
    private router: Router,
    private _snackBar: MatSnackBar,
    public productsService: ProductsService,
    private activatedRoute: ActivatedRoute,
    public events: EventsService,
    public sinistersService: SinistersService) {
    this.id=this.activatedRoute.snapshot.paramMap.get('id');
   }

   
  ngOnInit(): void {
    this.getData()
  }
  newStatus(status:string,data:any){
    this.spinner.show();
    this.sinistersService.changeStatus(status,this.id,this.observations).subscribe(
      (data:any) => {
        location.reload();
        console.log(this.data);
      },
      (error) => this.spinner.hide(),
      () => this.spinner.hide()
    );
  }
  getData(){
    this.spinner.show();
    this.sinistersService.getById(this.id).subscribe(
      (data:any) => {
        this.data=data;
        this.active=this.data.status.id;
        this.breadcrumbs[2].title=data.number;
        this.breadcrumbs[2].url='/sinisters/'+data.id;
        this.analizeStatus();
      },
      (error) => this.spinner.hide(),
      () => this.spinner.hide()
    );
  }

  save(){
    
  }

  analizeStatus(){
    switch(this.data.status.id){
      case 'NEED_TO_DEFINE_PRODUCTS':
          this.events.subscribe('app-form-product-sinister', (product: any) => this.productList.push(product.product));
          // this.status[0].disabled=true;
        break;
      case 'WAITING_FOR_PRODUCTS':
          // this.status[0].disabled=true;
          // this.status[1].disabled=true;
        break;
      case 'UNDELIVERED':
          // this.status[0].disabled=true;
          // this.status[1].disabled=true;
          // this.status[2].disabled=true;
        break;
      case 'DELIVERED':
          // this.status[0].disabled=true;
          // this.status[1].disabled=true;
          // this.status[2].disabled=true;
          // this.status[3].disabled=true;
        break;
      case 'INVOICED':
          // this.status[0].disabled=true;
          // this.status[1].disabled=true;
          // this.status[2].disabled=true;
          // this.status[3].disabled=true;
          // this.status[4].disabled=true;
        break;
      case 'DISCHARDGED':
          // this.status[0].disabled=true;
          // this.status[1].disabled=true;
          // this.status[2].disabled=true;
          // this.status[3].disabled=true;
          // this.status[4].disabled=true;
          // this.status[5].disabled=true;
        break;
      default:
        break;

    }
  }

  removeProduct(i:any){
    this.productList.splice(i,1);
  }

  ngOnDestroy(){
    this.events.destroy('app-form-product-sinister');
  }
}
