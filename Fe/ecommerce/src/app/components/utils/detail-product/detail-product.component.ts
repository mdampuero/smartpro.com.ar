import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { CartService } from 'src/app/services/api/cart.service';
import { ProductsService } from 'src/app/services/api/products.service';
import { LoginService } from 'src/app/services/db/login.service';
import { EventsService } from 'src/app/services/events.service';
import { ToastService } from 'src/app/services/toast.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.component.html',
  styleUrls: ['./detail-product.component.css']
})
export class DetailProductComponent implements OnInit {
  @Input() sku: any;
  public item:any;
  public amount=1;
  public similars=[];
  public inCart:any;
  public environment=environment;
  constructor(public productsService: ProductsService,public toast:ToastService,private router: Router,private activatedRoute: ActivatedRoute,private cartService:CartService,public events: EventsService,private spinner: NgxSpinnerService,public loginService:LoginService) {   
    
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      
      console.log("dsdas");
    });
    
    this.getData();
    this.getSimilars();
  }

  getData(){
    this.spinner.show();
		this.productsService.getOneBySku(this.sku).subscribe(
			(data:any) => {
        this.item=data;
				if(this.inCart = this.loginService.user.cart.items.find( (item: any) => item.product.id === this.item.id )){
          this.amount=this.inCart.amount;
        }
        
			},
			(error) => this.spinner.hide(),
			() => this.spinner.hide()
		);
  }

  getSimilars(){
    this.productsService.getSimilar(this.sku).subscribe(
      (data:any) => this.similars=data,
      (error) => {},
      () => {}
    );
  }

  addToCart(){
    this.spinner.show();
    this.cartService.save(this.item,this.amount).subscribe(
      (data:any) => { this.events.publish('updateCart', data); this.inCart=true;this.toast.show('Producto agregado al carrito') },
      (error) => {},
      () => {this.spinner.hide()}
    )
  }

  plus(){
    this.amount++;
  }
  minus(){
    if(this.amount>1){
      this.amount--;
    }
  }

}
