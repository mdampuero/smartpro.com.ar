import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { OrdersService } from 'src/app/services/api/orders.service';

@Component({
  selector: 'app-orders-detail',
  templateUrl: './orders-detail.component.html',
  styleUrls: ['./orders-detail.component.css']
})
export class OrdersDetailComponent implements OnInit {

  public id:any;
  public data:any;
  public breadcrumbs=[
    {url:'/inicio',title:'Inicio'},
    {url:'/orders',title:'Pedidos'},
    {url:'',title:''}
  ];

  constructor(private spinner: NgxSpinnerService,
    private router: Router,
    private _snackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute,
    public ordersService: OrdersService) {
    this.id=this.activatedRoute.snapshot.paramMap.get('id');
   }

  ngOnInit(): void {
    this.getData()
  }

  getData(){
    this.spinner.show();
    this.ordersService.getById(this.id).subscribe(
      (data:any) => {
        this.data=data;
        this.breadcrumbs[2].title=data.id;
      },
      (error) => this.spinner.hide(),
      () => this.spinner.hide()
    );
  }

}
