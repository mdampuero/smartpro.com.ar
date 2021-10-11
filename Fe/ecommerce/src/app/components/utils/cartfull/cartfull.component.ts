import { Component, Input, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/db/login.service';

@Component({
  selector: 'app-cartfull',
  templateUrl: './cartfull.component.html',
  styleUrls: ['./cartfull.component.css']
})
export class CartfullComponent implements OnInit {
  @Input() title: any;
  constructor(public loginService:LoginService) { }

  ngOnInit(): void {
  }

}
