import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesFormComponent } from './pages/categories/categories-form/categories-form.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { CompaniesFormComponent } from './pages/companies/companies-form/companies-form.component';
import { CompaniesComponent } from './pages/companies/companies.component';
import { DemoFormComponent } from './pages/demo/demo-form/demo-form.component';
import { DemoComponent } from './pages/demo/demo.component';
import { HomeComponent } from './pages/home/home.component';
import { ProductorsFormComponent } from './pages/productors/productors-form/productors-form.component';
import { ProductorsComponent } from './pages/productors/productors.component';
import { ProductsFormComponent } from './pages/products/products-form/products-form.component';
import { ProductsUploadComponent } from './pages/products/products-upload/products-upload.component';
import { ProductsComponent } from './pages/products/products.component';
import { ProvidersFormComponent } from './pages/providers/providers-form/providers-form.component';
import { ProvidersComponent } from './pages/providers/providers.component';
import { SinistersFormComponent } from './pages/sinisters/sinisters-form/sinisters-form.component';
import { SinistersComponent } from './pages/sinisters/sinisters.component';
import { SlidersFormComponent } from './pages/sliders/sliders-form/sliders-form.component';
import { SlidersComponent } from './pages/sliders/sliders.component';
import { TransportersFormComponent } from './pages/transporters/transporters-form/transporters-form.component';
import { TransportersComponent } from './pages/transporters/transporters.component';
import { UsersFormComponent } from './pages/users/users-form/users-form.component';
import { UsersComponent } from './pages/users/users.component';

const routes: Routes = [
  { path: 'demos', component: DemoComponent},
  { path: 'demos/nuevo', component: DemoFormComponent },
  { path: 'demos/editar/:id', component: DemoFormComponent },
  
  { path: 'productors', component: ProductorsComponent},
  { path: 'productors/nuevo', component: ProductorsFormComponent },
  { path: 'productors/editar/:id', component: ProductorsFormComponent },
  
  { path: 'sinisters', component: SinistersComponent},
  { path: 'sinisters/nuevo', component: SinistersFormComponent },
  { path: 'sinisters/editar/:id', component: SinistersFormComponent },

  { path: 'sliders', component: SlidersComponent},
  { path: 'sliders/nuevo', component: SlidersFormComponent },
  { path: 'sliders/editar/:id', component: SlidersFormComponent },
  
  { path: 'categories', component: CategoriesComponent},
  { path: 'categories/nuevo', component: CategoriesFormComponent },
  { path: 'categories/editar/:id', component: CategoriesFormComponent },
  
  { path: 'providers', component: ProvidersComponent},
  { path: 'providers/nuevo', component: ProvidersFormComponent },
  { path: 'providers/editar/:id', component: ProvidersFormComponent },
  
  { path: 'products', component: ProductsComponent},
  { path: 'products/nuevo', component: ProductsFormComponent },
  { path: 'products/editar/:id', component: ProductsFormComponent },
  { path: 'products/photos/:id', component: ProductsUploadComponent },
  
  { path: 'transporters', component: TransportersComponent},
  { path: 'transporters/nuevo', component: TransportersFormComponent },
  { path: 'transporters/editar/:id', component: TransportersFormComponent },

  { path: 'companies', component: CompaniesComponent},
  { path: 'companies/nuevo', component: CompaniesFormComponent },
  { path: 'companies/editar/:id', component: CompaniesFormComponent },

  { path: 'usuarios', component: UsersComponent},
  { path: 'usuarios/nuevo', component: UsersFormComponent },
  { path: 'usuarios/editar/:id', component: UsersFormComponent },
  
  { path: '', pathMatch:'full', component: HomeComponent},
  { path: '**', pathMatch:'full', component: HomeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
