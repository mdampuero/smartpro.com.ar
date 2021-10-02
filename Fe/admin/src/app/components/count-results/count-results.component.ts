import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-count-results',
  templateUrl: './count-results.component.html',
  styleUrls: ['./count-results.component.css']
})
export class CountResultsComponent implements OnInit {
  @Input() total: number = 0;
  @Input() limit: number = 0;
  @Input() pages: number = 0;
  constructor() { }

  ngOnInit(): void {
  }

}
