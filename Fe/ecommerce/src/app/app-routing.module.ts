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

const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'productos', component: ProductsComponent},
  { path: 'productos/:query', component: ProductsComponent},
  { path: 'carrito', component: CartComponent},
  { path: 'checkout', component: CheckoutComponent},
  { path: 'finalizado', component: FinishedComponent},
  { path: 'terminosYcondiciones', component: TermsComponent},
  { path: 'nosotros', component: AboutComponent},
  { path: '', pathMatch:'full', component: HomeComponent},
  { path: '**', pathMatch:'full', component: HomeComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{onSameUrlNavigation: 'reload',scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
