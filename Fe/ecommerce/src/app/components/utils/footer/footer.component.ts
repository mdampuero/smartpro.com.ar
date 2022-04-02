import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ServicesService } from 'src/app/services/api/services.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  public content:any={name:'',content:''};
  constructor(public servicesService: ServicesService,private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.servicesService.getAbout('FOOTER').subscribe(
      (data) =>  {
        this.spinner.hide();
        this.content=data;        
      },
      (error) => {
        this.spinner.hide();
      }
    );
  }
  onActivate(event:any) {
    window.scroll(0,0);
  }
}
