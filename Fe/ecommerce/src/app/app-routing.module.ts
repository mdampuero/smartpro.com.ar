import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './pages/about/about.component';
import { CartComponent } from './pages/cart/cart.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { FinishedComponent } from './pages/finished/finished.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { ProductsComponent } from './pages/products/products.component';
import { TermsComponent } from './pages/terms/terms.component';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'productos', component: ProductsComponent, canActivate:[AuthGuard]},
  { path: 'productos/:query', component: ProductsComponent,canActivate:[AuthGuard]},
  { path: 'carrito', component: CartComponent,canActivate:[AuthGuard]},
  { path: 'checkout', component: CheckoutComponent,canActivate:[AuthGuard]},
  { path: 'finalizado', component: FinishedComponent,canActivate:[]},
  { path: 'terminosYcondiciones', component: TermsComponent,canActivate:[AuthGuard]},
  { path: 'nosotros', component: AboutComponent,canActivate:[AuthGuard]},
  { path: '', pathMatch:'full', component: HomeComponent,canActivate:[AuthGuard]},
  { path: '**', pathMatch:'full', component: HomeComponent,canActivate:[AuthGuard]},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{onSameUrlNavigation: 'reload',scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
