import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-products-upload',
  templateUrl: './products-upload.component.html',
  styleUrls: ['./products-upload.component.css']
})
export class ProductsUploadComponent implements OnInit {
  public breadcrumbs=[
    {url:'/inicio',title:'Inicio'},
    {url:'/products',title:'Productos'},
    {url:'',title:'Nuevo'}
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
