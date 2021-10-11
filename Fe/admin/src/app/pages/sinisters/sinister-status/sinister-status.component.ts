import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { SinistersService } from 'src/app/services/api/sinisters.service';

@Component({
  selector: 'app-sinister-status',
  templateUrl: './sinister-status.component.html',
  styleUrls: ['./sinister-status.component.css']
})
export class SinisterStatusComponent implements OnInit {
  public id:any;
  active = 1;
  public data:any;
  public breadcrumbs=[
    {url:'/inicio',title:'Inicio'},
    {url:'/sinisters',title:'Siniestros'},
    {url:'',title:''},
    {url:'',title:'Cambiar estado'},
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

  getData(){
    this.spinner.show();
    this.sinistersService.getById(this.id).subscribe(
      (data:any) => {
        this.data=data;
        this.breadcrumbs[2].title=data.number;
        this.breadcrumbs[2].url='/sinisters/'+data.id;
      },
      (error) => this.spinner.hide(),
      () => this.spinner.hide()
    );
  }

}
