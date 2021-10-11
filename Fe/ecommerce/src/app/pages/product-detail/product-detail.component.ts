import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  public sku:any;
  constructor(private activatedRoute: ActivatedRoute) { 
    this.sku=this.activatedRoute.snapshot.paramMap.get('sku');
  }

  ngOnInit(): void {
    
  }
}
