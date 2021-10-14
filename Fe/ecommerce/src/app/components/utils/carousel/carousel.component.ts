import { Component, OnInit,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { SlidersService } from 'src/app/services/api/sliders.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {
  public data:any={ };
  public ready=false;
  public environment=environment;
  constructor(
    public slidersService: SlidersService
    ) { 
      
    }

  ngOnInit(): void {
    this.getResult()
  }

  getResult(){
    this.slidersService.getAll().subscribe(
      (data:any) => this.data=data,
      (error) => {},
      () => { this.ready=true;}
    );
  }
}
