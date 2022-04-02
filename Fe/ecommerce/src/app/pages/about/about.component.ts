import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ServicesService } from 'src/app/services/api/services.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  public content:any={name:'',content:''};
  constructor(public servicesService: ServicesService,private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.servicesService.getAbout('ABOUT').subscribe(
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
