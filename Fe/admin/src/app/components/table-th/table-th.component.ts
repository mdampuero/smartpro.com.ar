import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-table-th',
  templateUrl: './table-th.component.html',
  styleUrls: ['./table-th.component.css']
})
export class TableThComponent implements OnInit {
  @Input() title: string='';
  @Input() direction: string='';
  @Input() sort: string='';
  @Input() field: string='';
  
  constructor() { }

  ngOnInit(): void {

  }

}
