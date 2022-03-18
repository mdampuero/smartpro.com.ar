import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PayService } from 'src/app/services/db/pay.service';

@Component({
  selector: 'app-feeedback',
  templateUrl: './feeedback.component.html',
  styleUrls: ['./feeedback.component.css']
})
export class FeeedbackComponent implements OnInit {
  public payment:any;
  constructor(private router: Router,private activatedRoute: ActivatedRoute,private payService:PayService) {
    this.activatedRoute.queryParams.subscribe(params => {
      this.payment=params;
    });
   }

  ngOnInit(): void {
    this.payService.savePay(this.payment);
    this.router.navigate([`/checkout`]);
  }

}
