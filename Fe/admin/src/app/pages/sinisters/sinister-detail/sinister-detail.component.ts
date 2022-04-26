import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { SinistersService } from 'src/app/services/api/sinisters.service';
import { EventsService } from 'src/app/services/events.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sinister-detail',
  templateUrl: './sinister-detail.component.html',
  styleUrls: ['./sinister-detail.component.css']
})
export class SinisterDetailComponent implements OnInit {
  public id:any;
  public data:any;
  observations:any;
  public newStatusSelect:any=-1;
  public breadcrumbs=[
    {url:'/inicio',title:'Inicio'},
    {url:'/sinisters',title:'Siniestros'},
    {url:'',title:''}
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
    public events: EventsService,
    private _snackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute,
    public sinistersService: SinistersService) {
    this.id=this.activatedRoute.snapshot.paramMap.get('id');
   }

  ngOnInit(): void {
    this.getData();
    this.events.subscribe('app-form-product-sinister', (data: any) => {
      this.spinner.show();
      this.sinistersService.addProduct(this.id,data.product).subscribe(
        (data:any) => this.getData(),
        (error) => this.spinner.hide(),
        () => this.spinner.hide()
      );
      this._snackBar.open('Producto agregado','Aceptar', { duration: 3000 });
    });
  }

  getData(){
    this.spinner.show();
    this.sinistersService.getById(this.id).subscribe(
      (data:any) => {
        this.data=data;
        this.breadcrumbs[2].title=data.number;        
      },
      (error) => this.spinner.hide(),
      () => this.spinner.hide()
    );
  }

  newStatus(){
    if(this.newStatusSelect==-1)
      return false;
    this.spinner.show();
    this.sinistersService.changeStatus(this.status[this.newStatusSelect].id,this.id,this.observations).subscribe(
      (data:any) => this.getData(),
      (error) => this.spinner.hide(),
      () => this.spinner.hide()
    );
    return true;
  }

  remove(product:any){
    Swal.fire({
      text: '¿Está seguro que desea quitar este producto?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, quitar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.spinner.show();
        this.sinistersService.removeProduct(this.id,product).subscribe(
          (data:any) => {
            this.getData()
          },
          (error) => this.spinner.hide(),
          () => this.spinner.hide()
        );
        this._snackBar.open('Producto quitado','Aceptar', { duration: 3000 });
      }
    });
  }

  ngOnDestroy(){
    this.events.destroy('app-form-product-sinister');
  }
}
