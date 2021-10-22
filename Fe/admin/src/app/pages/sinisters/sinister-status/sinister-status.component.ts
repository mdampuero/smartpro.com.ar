import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { SinistersService } from 'src/app/services/api/sinisters.service';
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
  public id:any;
  public active:string | undefined;
  public data:any;
  public breadcrumbs=[
    {url:'/inicio',title:'Inicio'},
    {url:'/sinisters',title:'Siniestros'},
    {url:'',title:''},
    {url:'',title:'Cambiar estado'},
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
    private activatedRoute: ActivatedRoute,
    public sinistersService: SinistersService) {
    this.id=this.activatedRoute.snapshot.paramMap.get('id');
   }

  ngOnInit(): void {
    this.getData()
  }
  newStatus(status:string){
    this.spinner.show();
    this.sinistersService.changeStatus(status,this.id).subscribe(
      (data:any) => {
        
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

  analizeStatus(){
    switch(this.data.status.id){
      case 'DISCHARDGED':
          this.status[0].disabled=true;
          this.status[1].disabled=true;
          this.status[2].disabled=true;
          this.status[3].disabled=true;
          this.status[4].disabled=true;
        break;
      case 'NEED_TO_DEFINE_PRODUCTS':
          this.status[2].disabled=true;
          this.status[3].disabled=true;
          this.status[4].disabled=true;
          this.status[5].disabled=true;
        break;
      default:
        break;

    }
  }
}
