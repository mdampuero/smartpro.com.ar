import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/db/login.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  constructor(public loginService:LoginService) { }
  ngOnInit(): void { }
}
