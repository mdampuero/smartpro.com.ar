import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  constructor(private router: Router,public events: EventsService,private activatedRoute: ActivatedRoute,public loginService:LoginService) { 
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
  }
  logout(){
    this.loginService.logout();
    location.href='/login'
  }
  onEnter(){    
    this.router.navigate([`/productos/${this.query}`]);
    this.events.publish('searchInput', {
      query: this.query,
    });
  }
}
