import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesFormComponent } from './pages/categories/categories-form/categories-form.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { CompaniesFormComponent } from './pages/companies/companies-form/companies-form.component';
import { CompaniesComponent } from './pages/companies/companies.component';
import { DemoFormComponent } from './pages/demo/demo-form/demo-form.component';
import { DemoComponent } from './pages/demo/demo.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { OrdersDetailComponent } from './pages/orders/orders-detail/orders-detail.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { ProductorsFormComponent } from './pages/productors/productors-form/productors-form.component';
import { ProductorsComponent } from './pages/productors/productors.component';
import { ProductsFormComponent } from './pages/products/products-form/products-form.component';
import { ProductsUpdateComponent } from './pages/products/products-update/products-update.component';
import { ProductsUploadComponent } from './pages/products/products-upload/products-upload.component';
import { ProductsComponent } from './pages/products/products.component';
import { ProvidersFormComponent } from './pages/providers/providers-form/providers-form.component';
import { ProvidersComponent } from './pages/providers/providers.component';
import { SinisterDetailComponent } from './pages/sinisters/sinister-detail/sinister-detail.component';
import { SinisterStatusComponent } from './pages/sinisters/sinister-status/sinister-status.component';
import { SinistersFormComponent } from './pages/sinisters/sinisters-form/sinisters-form.component';
import { SinistersComponent } from './pages/sinisters/sinisters.component';
import { SlidersFormComponent } from './pages/sliders/sliders-form/sliders-form.component';
import { SlidersComponent } from './pages/sliders/sliders.component';
import { TransportersFormComponent } from './pages/transporters/transporters-form/transporters-form.component';
import { TransportersComponent } from './pages/transporters/transporters.component';
import { UsersFormComponent } from './pages/users/users-form/users-form.component';
import { UsersComponent } from './pages/users/users.component';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent},

  { path: 'demos', component: DemoComponent,canActivate:[AuthGuard]},
  { path: 'demos/nuevo', component: DemoFormComponent ,canActivate:[AuthGuard]},
  { path: 'demos/editar/:id', component: DemoFormComponent ,canActivate:[AuthGuard]},
  
  { path: 'orders', component: OrdersComponent,canActivate:[AuthGuard]},
  { path: 'orders/:id', component: OrdersDetailComponent,canActivate:[AuthGuard]},
  
  { path: 'productors', component: ProductorsComponent,canActivate:[AuthGuard]},
  { path: 'productors/nuevo', component: ProductorsFormComponent ,canActivate:[AuthGuard]},
  { path: 'productors/editar/:id', component: ProductorsFormComponent ,canActivate:[AuthGuard]},
  
  { path: 'sinisters', component: SinistersComponent,canActivate:[AuthGuard]},
  { path: 'sinisters/nuevo', component: SinistersFormComponent ,canActivate:[AuthGuard]},
  { path: 'sinisters/editar/:id', component: SinistersFormComponent ,canActivate:[AuthGuard]},
  { path: 'sinisters/:id', component: SinisterDetailComponent ,canActivate:[AuthGuard]},
  { path: 'sinisters/status/:id', component: SinisterStatusComponent ,canActivate:[AuthGuard]},

  { path: 'sliders', component: SlidersComponent,canActivate:[AuthGuard]},
  { path: 'sliders/nuevo', component: SlidersFormComponent ,canActivate:[AuthGuard]},
  { path: 'sliders/editar/:id', component: SlidersFormComponent ,canActivate:[AuthGuard]},
  
  { path: 'categories', component: CategoriesComponent,canActivate:[AuthGuard]},
  { path: 'categories/nuevo', component: CategoriesFormComponent ,canActivate:[AuthGuard]},
  { path: 'categories/editar/:id', component: CategoriesFormComponent ,canActivate:[AuthGuard]},
  
  { path: 'providers', component: ProvidersComponent,canActivate:[AuthGuard]},
  { path: 'providers/nuevo', component: ProvidersFormComponent ,canActivate:[AuthGuard]},
  { path: 'providers/editar/:id', component: ProvidersFormComponent ,canActivate:[AuthGuard]},
  
  { path: 'products', component: ProductsComponent,canActivate:[AuthGuard]},
  { path: 'products/updatePrice', component: ProductsUpdateComponent,canActivate:[AuthGuard]},
  { path: 'products/nuevo', component: ProductsFormComponent ,canActivate:[AuthGuard]},
  { path: 'products/editar/:id', component: ProductsFormComponent ,canActivate:[AuthGuard]},
  { path: 'products/photos/:id', component: ProductsUploadComponent ,canActivate:[AuthGuard]},
  
  { path: 'transporters', component: TransportersComponent,canActivate:[AuthGuard]},
  { path: 'transporters/nuevo', component: TransportersFormComponent ,canActivate:[AuthGuard]},
  { path: 'transporters/editar/:id', component: TransportersFormComponent ,canActivate:[AuthGuard]},

  { path: 'companies', component: CompaniesComponent,canActivate:[AuthGuard]},
  { path: 'companies/nuevo', component: CompaniesFormComponent ,canActivate:[AuthGuard]},
  { path: 'companies/editar/:id', component: CompaniesFormComponent ,canActivate:[AuthGuard]},

  { path: 'usuarios', component: UsersComponent,canActivate:[AuthGuard]},
  { path: 'usuarios/nuevo', component: UsersFormComponent ,canActivate:[AuthGuard]},
  { path: 'usuarios/editar/:id', component: UsersFormComponent ,canActivate:[AuthGuard]},
  
  { path: '', pathMatch:'full', component: HomeComponent,canActivate:[AuthGuard]},
  { path: '**', pathMatch:'full', component: HomeComponent,canActivate:[AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
