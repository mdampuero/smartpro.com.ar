import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { CartService } from 'src/app/services/api/cart.service';
import { LoginService } from 'src/app/services/db/login.service';
import { EventsService } from 'src/app/services/events.service';
import { ToastService } from 'src/app/services/toast.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-card-product',
  templateUrl: './card-product.component.html',
  styleUrls: ['./card-product.component.css']
})
export class CardProductComponent implements OnInit {
  @Input() item: any;
  public inCart=false;
  public environment=environment;
  constructor(private router: Router,public toast:ToastService,private cartService:CartService,public events: EventsService,private spinner: NgxSpinnerService,public loginService:LoginService) {   
    
  }

  ngOnInit(): void {
    this.inCart = this.loginService.user.cart.items.find( (item: any) => item.product.id === this.item.id );
  }

  addToCart(){
    this.spinner.show();
    this.cartService.save(this.item,1).subscribe(
      (data:any) => { this.events.publish('updateCart', data); this.inCart=true; this.toast.show('Producto agregado al carrito'); },
      (error) => {},
      () => {this.spinner.hide()}
    )
  }

  goToProduct(){
    this.router.navigate([`/producto/${this.item.sku}`]);
  }
  ngOnDestroy(){
	}

}
