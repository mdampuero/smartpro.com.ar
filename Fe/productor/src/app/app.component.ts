import { Component } from '@angular/core';
import { LoginService } from './services/db/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'productor';
  constructor(public loginService:LoginService) { }
}
