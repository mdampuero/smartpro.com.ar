import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate,  RouterStateSnapshot, UrlTree } from '@angular/router';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from './db/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(public loginService:LoginService,public router:Router) {

  }
  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    // when the user is logged in and just navigated to another route...
    if (this.loginService.isAutenticate()) { return true; } 
  
    // proceeds if not loggedIn or F5/page refresh 
  
    // Store the attempted URL for redirecting later
    //this.authService.redirectUrl = state.url;
  
    // go login page
    this.router.navigate(['/login']);
    return false;
  }
    //return this.loginService.isAutenticate();
}
