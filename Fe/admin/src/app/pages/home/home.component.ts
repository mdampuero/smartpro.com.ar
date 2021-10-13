import { Component, OnInit } from '@angular/core';
import { OrdersService } from 'src/app/services/api/orders.service';
import { SinistersService } from 'src/app/services/api/sinisters.service';
import { StatsService } from 'src/app/services/api/stats.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  public totals:any;
  public todaySinister:any;
  public todayOrder:any;
  constructor(
    public statsService:StatsService, 
    public sinistersService:SinistersService,
    public ordersService:OrdersService) {}

  ngOnInit(): void {
    this.statsService.total().subscribe((data:any) => this.totals=data);
    this.sinistersService.today().subscribe((data:any) => this.todaySinister=data);
    this.ordersService.today().subscribe((data:any) => this.todayOrder=data);
  }

}
