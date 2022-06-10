import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { SinistersService } from 'src/app/services/api/sinisters.service';
import { LoginService } from 'src/app/services/db/login.service';
import { EventsService } from 'src/app/services/events.service';
import { ProductorService } from 'src/app/services/api/productor.service';
import { param } from 'jquery';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';
import { StatusService } from 'src/app/services/api/status.service';
import { MAT_DATE_FORMATS,MAT_DATE_LOCALE } from '@angular/material/core';
import {Moment} from "moment";
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
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'es-ES' },
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }
  ]
})

export class HomeComponent implements OnInit {

  public data:any={ };
  public productorId='';
  public statusId='';
  public datePickerFrom:any;
  public datePickerTo:any;
  public dateFrom='';
  public dateTo='';
  public productors:any;
  public status:any;
  public query:string='';
  constructor(public loginService:LoginService,public productorService:ProductorService,public statusService:StatusService,private spinner: NgxSpinnerService,
    public sinistersService: SinistersService,
    private router: Router,
    private _snackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute,
    public events: EventsService) {
      this.getParam();
    }

  ngOnInit(): void {
    if(!this.loginService.user.isSuper){
      this.productorId=this.loginService.user.id
    }else{
      this.productorService.getAll().subscribe((data:any) => this.productors=data);
    }
    this.statusService.getAll().subscribe((data:any) => this.status=data.data);
    this.getResult();
  }
  handleDOBChange(event: { value: any; }) {
    this.goToPageProductor();
  }
  getParam(){
    this.activatedRoute.queryParams.subscribe(params => {
      if(params["p"]){
        this.productorId=params["p"];
      }
      if(params["s"]){
        this.statusId=params["s"];
      }
      if(params["f"]){
        this.datePickerFrom=params["f"];
        this.dateFrom=params["f"];
      }
      if(params["t"]){
        this.datePickerTo=params["t"];
        this.dateTo=params["t"];
      }
    });
  }

  getResult(){

    if(this.productorId){
      this.spinner.show();
      this.sinistersService.get(this.query,this.productorId,this.statusId,this.dateFrom,this.dateTo).subscribe(
        (data:any) => this.data=data,
        (error) => this.spinner.hide(),
        () => this.spinner.hide()
        );
      }else{
        this.spinner.show();
        this.sinistersService.getByCompany(this.query,this.statusId,this.dateFrom,this.dateTo).subscribe(
          (data:any) => this.data=data,
          (error) => this.spinner.hide(),
          () => this.spinner.hide()
          );
      }
  }
  goToSinister(id:string){
    this.router.navigate([`/siniestro/${id}`],{
      queryParams: {
        p: this.productorId,
        s: this.statusId,
        f: this.dateFrom,
        t: this.dateTo
      }
    });
  }

  convertDate(){
    if(this.datePickerFrom && typeof this.datePickerFrom != "string")
      this.dateFrom=this.datePickerFrom.format('YYYY-MM-DD');
    if(this.datePickerTo && typeof this.datePickerTo != "string")
      this.dateTo=this.datePickerTo.format('YYYY-MM-DD');
  }

  goToPageProductor(){
    this.convertDate();
    this.router.navigate([],{
      queryParams: {
        p: this.productorId,
        s: this.statusId,
        f: this.dateFrom,
        t: this.dateTo
      },
      queryParamsHandling: 'merge',
    });
    this.getResult();
  }
  deleteSinister(index:number){
    Swal.fire({
      text: '¿Está seguro que desea eliminar este siniestro?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.sinistersService.delete(this.data.data[index]).subscribe();
        this.data.data.splice(index,1);
        this._snackBar.open('Siniestro eliminado','Aceptar', { duration: 4000 });
      }
    });
  }
  downSinister(index:number){
    Swal.fire({
      text: '¿Está seguro que desea dar de baja siniestro?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, dar de baja',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.sinistersService.down(this.data.data[index]).subscribe(() => this.getResult());
        this._snackBar.open('Siniestro dado de baja','Aceptar', { duration: 4000 });
      }
    });
  }
}
