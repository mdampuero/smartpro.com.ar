import { Component, Input, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { CartService } from 'src/app/services/api/cart.service';
import { EventsService } from 'src/app/services/events.service';
import { ToastService } from 'src/app/services/toast.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css']
})
export class CartItemComponent implements OnInit {
  @Input() item: any;
  public environment=environment;
  constructor(private cartService:CartService,public toast:ToastService,public events: EventsService,private spinner: NgxSpinnerService) {}

  ngOnInit(): void {

  }
  
  plus(){
    if(this.item.amount<this.item.product.stock){
      this.item.amount++;    
      this.spinner.show();
      this.update();
    }else{ 
      this.toast.show('La cantidad no puede superar a '+this.item.product.stock);
    }
    
  }
  minus(){
    if(this.item.amount>1){
      this.item.amount--;
      this.update();
    }
  }
  update(){
    this.cartService.save(this.item.product,this.item.amount).subscribe(
      (data:any) => { this.events.publish('updateCart', data); this.toast.show('Se actualizó el carrito')},
      (error) => {},
      () => {this.spinner.hide()}
    )
  }
  removeItem(){
    this.spinner.show();
    this.cartService.delete(this.item).subscribe(
      (data:any) => { this.events.publish('updateCart', data); this.toast.show('Producto eliminado del carrito') },
      (error) => {},
      () => {this.spinner.hide()}
    )
  }
  
}
