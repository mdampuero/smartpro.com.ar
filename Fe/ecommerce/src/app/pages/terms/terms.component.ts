import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ServicesService } from 'src/app/services/api/services.service';

@Component({
  selector: 'app-terms',
  templateUrl: './terms.component.html',
  styleUrls: ['./terms.component.css']
})
export class TermsComponent implements OnInit {
  public content:any={name:'',content:''};
  constructor(public servicesService: ServicesService,private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.servicesService.getAbout('TERMS').subscribe(
      (data) =>  {
        this.spinner.hide();
        this.content=data;        
      },
      (error) => {
        this.spinner.hide();
      }
    );
  }

}
