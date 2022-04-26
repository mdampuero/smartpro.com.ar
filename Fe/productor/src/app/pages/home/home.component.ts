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

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public data:any={ };
  public productorId='';
  public statusId='';
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
      this.statusService.getAll().subscribe((data:any) => this.status=data.data);
    }
    this.getResult();
  }

  getParam(){
    this.activatedRoute.queryParams.subscribe(params => {
      if(params["p"]){
        this.productorId=params["p"];
      }
      if(params["s"]){
        this.statusId=params["s"];
      }
    });
  }

  getResult(){
    if(this.productorId){
      this.spinner.show();
      this.sinistersService.get(this.query,this.productorId,this.statusId).subscribe(
        (data:any) => this.data=data,
        (error) => this.spinner.hide(),
        () => this.spinner.hide()
        );
      }
  }
  goToSinister(id:string){
    this.router.navigate([`/siniestro/${id}`],{
      queryParams: {
        p: this.productorId
      }
    });
  }
  goToPageProductor(){
    this.router.navigate([],{
      queryParams: {
        p: this.productorId,
        s: this.statusId
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
}
