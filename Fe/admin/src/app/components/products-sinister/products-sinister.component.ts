import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-products-sinister',
  templateUrl: './products-sinister.component.html',
  styleUrls: ['./products-sinister.component.css']
})
export class ProductsSinisterComponent implements OnInit {
  @Input() items: any;
  constructor() { }

  ngOnInit(): void {
    
  }

}
