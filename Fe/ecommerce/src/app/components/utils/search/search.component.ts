import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/services/api/cart.service';
import { LoginService } from 'src/app/services/db/login.service';
import { EventsService } from 'src/app/services/events.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  public query:any='';
  public buy=0;
  public items=0;
  constructor(private router: Router,private cartService:CartService,public events: EventsService,private activatedRoute: ActivatedRoute,public loginService:LoginService) { 
    this.events.subscribe('updateCart', (data: any) => {  
      this.loginService.user.cart=data; 
      this.loginService.saveStorage();      
		});
  }

  updateView(cart:any){
    this.buy=cart.total;
		this.items=cart.items.length;
  }

  ngOnInit(): void {
    // this.cartService.get().subscribe(
    //   (data:any) => this.events.publish('updateCart', data),
    //   (error) => {},
    //   () => {}
    // )
  }

  onEnter(){    
    this.router.navigate([`/productos/${this.query}`]);
    this.events.publish('searchInput', {
      query: this.query,
    });
  }
}
