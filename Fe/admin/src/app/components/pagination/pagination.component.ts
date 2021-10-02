import { Component, Input, OnInit } from '@angular/core';
import { EventsService } from 'src/app/services/events.service';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {
  @Input() total: number = 0;
  @Input() limit: number = 0;
  @Input() pages: number = 0;
  public currentPage:number=0;

  constructor(public events: EventsService) { 
    this.events.subscribe('paginationOffset', (data: any) => {
      this.currentPage=0;
    });
  }

  ngOnInit(): void {

  }

  next(){
    if(this.currentPage<this.pages){
      this.currentPage++;
      this.emmit();
    }
  }

  previus(){
    if(this.currentPage>0){
      this.currentPage--;
      this.emmit();
    }
  }

  emmit(){
    this.events.publish('pagination', {
      currentPage: this.currentPage,
    });
  }
}
