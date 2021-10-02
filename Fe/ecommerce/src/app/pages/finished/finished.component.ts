import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/db/login.service';

@Component({
  selector: 'app-finished',
  templateUrl: './finished.component.html',
  styleUrls: ['./finished.component.css']
})
export class FinishedComponent implements OnInit {

  constructor(private router: Router,public loginService:LoginService) { }

  ngOnInit(): void {
    // setTimeout(() =>{
    //   this.loginService.logout()
    // },5000)
  }

}
