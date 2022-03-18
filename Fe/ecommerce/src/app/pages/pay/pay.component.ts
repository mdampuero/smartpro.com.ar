import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { PayapiService } from 'src/app/services/api/payapi.service';
import { PayService } from 'src/app/services/db/pay.service';

@Component({
  selector: 'app-pay',
  templateUrl: './pay.component.html',
  styleUrls: ['./pay.component.css']
})
export class PayComponent implements OnInit {
  public pay:any;
  constructor(public payService:PayService,public payapiService:PayapiService,private spinner: NgxSpinnerService,) { 

  }

  ngOnInit(): void {
    this.pay=this.payService.loadStorage();
    this.spinner.show();
    this.payapiService.save(this.pay).subscribe(
      (data:any) => {
      
        this.spinner.hide();
      },
      (error) => {
        
        this.spinner.hide();
      }
    );
    console.log(this.pay)
  }

}
