import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { EventsService } from 'src/app/services/events.service';
import Swal from 'sweetalert2';

import {MatSnackBar} from '@angular/material/snack-bar';
import { SinistersService } from 'src/app/services/api/sinisters.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { Companies } from 'src/app/models/companies.model';
import { CompaniesService } from 'src/app/services/api/companies.service';
import { StatusService } from 'src/app/services/api/status.service';
import { ProductorsService } from 'src/app/services/api/productors.service';
import { LoginService } from 'src/app/services/db/login.service';
import { ThrowStmt } from '@angular/compiler';
@Component({
  selector: 'app-sinisters',
  templateUrl: './sinisters.component.html'
})

export class SinistersComponent implements OnInit {
  public data:any={ };
  public query:string='';
  public breadcrumbs=[{url:'/home',title:'Inicio'},{url:'',title:'Siniestros'}];
  public filtersForm:any={ companies: [],status:[], productors:[] };
  public filters:any={};
  constructor(
    private spinner: NgxSpinnerService,
    public sinistersService: SinistersService,
    public events: EventsService,
    public loginService: LoginService,
    public companiesService: CompaniesService,
    public productorsService: ProductorsService,
    public statusService: StatusService,
    private modalService: NgbModal,
    private _snackBar: MatSnackBar
  ) { 
    this.events.subscribe('pagination', (data: any) => {
      this.sinistersService.calcOffset(data.currentPage);
      this.getResult();
    });
    this.events.subscribe('order', () => this.getResult());
    this.companiesService.getAll().subscribe((data:any) => this.filtersForm.companies=data.data);
    this.statusService.getAll().subscribe((data:any) => this.filtersForm.status=data.data);
    this.productorsService.getAll().subscribe((data:any) => this.filtersForm.productors=data.data);
  }

  ngOnInit(): void {
    this.setFilters(false); 
    this.getResult();
  }
  
  ngOnDestroy(){
    this.events.destroy('pagination');
    this.events.destroy('order');
  }

  search(){
    this.events.publish('paginationOffset', {});
    this.sinistersService.offset=0;
    this.getResult();
  }

  getResult(){
    this.spinner.show();
    this.sinistersService.get(this.query,this.filters).subscribe(
      (data:any) => this.data=data,
      (error) => this.spinner.hide(),
      () => this.spinner.hide()
    );
  }
  
  remove(index:number){
    Swal.fire({
      text: '¿Está seguro que desea eliminar este registro?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.sinistersService.delete(this.data.data[index]).subscribe();
        this.data.data.splice(index,1);
        this._snackBar.open('Registro eliminado','Aceptar', { duration: 3000 });
      }
    });
  }

  open(content:any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      
    }, (reason) => {
      
    });
  }
  
  filter(){
    this.modalService.dismissAll();
    this.persistFilter();
    this.getResult();
  }

  setFilters(clear:Boolean){
    if(clear){
      this.filters={ company:"",status:"", productor:""};
      this.persistFilter();
    }else{
      if(this.loginService.user.filters && this.loginService.user.filters.sinisters)
        this.filters=this.loginService.user.filters.sinisters;
      else
        this.filters={ company:"",status:"", productor:""};
    }
  }

  clear(){
    this.setFilters(true);  
    this.modalService.dismissAll();
    this.getResult();
  }

  persistFilter(){
    this.loginService.user.filters = { sinisters: this.filters};
    this.loginService.saveStorage();
  }

  private getDismissReason(reason: any): string {
    return '';
  }
  
}
