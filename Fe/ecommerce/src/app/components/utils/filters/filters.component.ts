import { Component, OnInit } from '@angular/core';
import { Options } from '@angular-slider/ngx-slider';
import { EventsService } from 'src/app/services/events.service';
import { CategoriesService } from 'src/app/services/api/categories.service';
import { Categories } from 'src/app/models/categories.model';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent implements OnInit {
  public ready=false;
  public category=0;
  public categories={data:[{name:'',id:''}]};
  public min=1000;
  public max=300000;
  minValue: number = this.min;
  value: number=this.min;
  maxValue: number = this.max;
  options: Options = {
    floor: 0,
    step:1,
    ceil: this.max
  };
  constructor(public events: EventsService,public categoriesService: CategoriesService) {
    
  }

  resetFilter(){
    this.minValue=this.min;
    this.category=0;
		this.maxValue=this.max;
    this.changeRange();
  }

  ngOnInit(): void {
    this.categoriesService.getAll().subscribe(
      (data:any) => this.categories=data,
      (error) => {},
      () => { this.ready=true;}
    );
  }

  changeRange(){
    this.events.publish('filter', {
      filter: {
        priceMin:this.minValue,
        priceMax:this.maxValue,
        category:this.category
      }
    });
  }
  changeCategory(){
    
    this.events.publish('filter', {
      filter: {
        priceMin:this.minValue,
        priceMax:this.maxValue,
        category:this.category
      }
    });
    
  }
}
