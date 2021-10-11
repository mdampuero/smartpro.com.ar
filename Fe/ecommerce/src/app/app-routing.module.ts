import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './pages/about/about.component';
import { AccountComponent } from './pages/account/account.component';
import { CartComponent } from './pages/cart/cart.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { ProductsComponent } from './pages/products/products.component';
import { TermsComponent } from './pages/terms/terms.component';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'productos', component: ProductsComponent, canActivate:[AuthGuard]},
  { path: 'productos/:query', component: ProductsComponent,canActivate:[AuthGuard]},
  { path: 'producto/:sku', component: ProductDetailComponent,canActivate:[AuthGuard]},
  { path: 'carrito', component: CartComponent,canActivate:[AuthGuard]},
  { path: 'micuenta', component: AccountComponent,canActivate:[AuthGuard]},
  { path: 'checkout', component: CheckoutComponent,canActivate:[AuthGuard]},
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
