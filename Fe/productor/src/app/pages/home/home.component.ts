import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { SinistersService } from 'src/app/services/api/sinisters.service';
import { LoginService } from 'src/app/services/db/login.service';
import { EventsService } from 'src/app/services/events.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public data:any={ };
  public query:string='';
  constructor(public loginService:LoginService,private spinner: NgxSpinnerService,
    public sinistersService: SinistersService,
    private router: Router,
    public events: EventsService) { }

  ngOnInit(): void {
    this.getResult();
  }
  getResult(){
    this.spinner.show();
    this.sinistersService.get(this.query).subscribe(
      (data:any) => this.data=data,
      (error) => this.spinner.hide(),
      () => this.spinner.hide()
    );
  }
  goToSinister(id:string){
    this.router.navigate([`/siniestro/${id}`]);
  }
}
