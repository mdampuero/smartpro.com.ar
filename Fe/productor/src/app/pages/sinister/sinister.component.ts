import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { SinistersService } from 'src/app/services/api/sinisters.service';
import { LoginService } from 'src/app/services/db/login.service';

@Component({
  selector: 'app-sinister',
  templateUrl: './sinister.component.html',
  styleUrls: ['./sinister.component.css']
})
export class SinisterComponent implements OnInit {
  public id:any;
  public data:any;
  public company:any;
  public productorSelected='';
  constructor(
    public loginService:LoginService,
    private spinner: NgxSpinnerService,
    private activatedRoute: ActivatedRoute,
    public sinistersService: SinistersService) {
      this.id=this.activatedRoute.snapshot.paramMap.get('id');
      this.activatedRoute.queryParams.subscribe(params => {
        if(params["p"]){
          this.productorSelected=params["p"];
        }
      });
  }

  ngOnInit(): void {
    this.getResult();
  }

  getResult(){
    this.spinner.show();
    this.sinistersService.getOne(this.id).subscribe(
      (data:any) => this.data=data,
      (error) => this.spinner.hide(),
      () => this.spinner.hide()
    );
  }

}
