import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { NewComponent } from './pages/new/new.component';
import { SinisterComponent } from './pages/sinister/sinister.component';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'siniestro/:id', component: SinisterComponent},
  { path: 'nuevo', component: NewComponent},
  { path: '', pathMatch:'full', component: HomeComponent,canActivate:[AuthGuard]},
  { path: '**', pathMatch:'full', component: HomeComponent,canActivate:[AuthGuard]},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
