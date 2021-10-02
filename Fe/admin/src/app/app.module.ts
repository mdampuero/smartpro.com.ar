import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxSpinnerModule } from "ngx-spinner";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule} from '@angular/common/http';
import { HomeComponent } from './pages/home/home.component';

import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { FormsModule } from '@angular/forms';
import { PaginationComponent } from './components/pagination/pagination.component';
import { CountResultsComponent } from './components/count-results/count-results.component';
import { TableThComponent } from './components/table-th/table-th.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatTooltipModule} from '@angular/material/tooltip';

import { DemoComponent } from './pages/demo/demo.component';
import { DemoFormComponent } from './pages/demo/demo-form/demo-form.component';
import { UsersComponent } from './pages/users/users.component';
import { UsersFormComponent } from './pages/users/users-form/users-form.component';
import { RolePipe } from './pipes/role.pipe';
import { SelectComponent } from './components/form/select/select.component';
import { BadgeBinaryPipe } from './pipes/badge-binary.pipe';
import { NavbarComponent } from './components/navbar/navbar.component';

import { ProductorsComponent } from './pages/productors/productors.component';
import { ProductorsFormComponent } from './pages/productors/productors-form/productors-form.component';

import { CompaniesComponent } from './pages/companies/companies.component';
import { CompaniesFormComponent } from './pages/companies/companies-form/companies-form.component';

import { ProductsComponent } from './pages/products/products.component';
import { ProductsFormComponent } from './pages/products/products-form/products-form.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { CategoriesFormComponent } from './pages/categories/categories-form/categories-form.component';
import { TransportersComponent } from './pages/transporters/transporters.component';
import { TransportersFormComponent } from './pages/transporters/transporters-form/transporters-form.component';
import { ProvidersComponent } from './pages/providers/providers.component';
import { ProvidersFormComponent } from './pages/providers/providers-form/providers-form.component';
import { SinistersComponent } from './pages/sinisters/sinisters.component';
import { SinistersFormComponent } from './pages/sinisters/sinisters-form/sinisters-form.component';

import {MatDatepickerModule} from '@angular/material/datepicker';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import {NgbPaginationModule, NgbAlertModule} from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from './pipes/date.pipe';
import { UploadComponent } from './components/upload/upload.component';
import { ProductsUploadComponent } from './pages/products/products-upload/products-upload.component';
import { CardPictureComponent } from './components/card-picture/card-picture.component';
import { InputFileComponent } from './components/input-file/input-file.component';
import { ThumbnailPictureComponent } from './components/thumbnail-picture/thumbnail-picture.component';
import { SlidersComponent } from './pages/sliders/sliders.component';
import { SlidersFormComponent } from './pages/sliders/sliders-form/sliders-form.component';

@NgModule({
  declarations: [
    ProductorsComponent,
    ProductorsFormComponent,
    SinistersComponent,
    SinistersFormComponent,
    SlidersComponent,
    SlidersFormComponent,
    ProvidersComponent,
    ProvidersFormComponent,
    TransportersComponent,
    TransportersFormComponent,
    CompaniesComponent,
    CompaniesFormComponent,
    ProductsComponent,
    ProductsFormComponent,
    CategoriesComponent,
    CategoriesFormComponent,
    AppComponent,
    HomeComponent,
    DemoComponent,
    BreadcrumbComponent,
    PaginationComponent,
    CountResultsComponent,
    TableThComponent,
    DemoFormComponent,
    UsersComponent,
    RolePipe,
    UsersFormComponent,
    RolePipe,
    SelectComponent,
    BadgeBinaryPipe,
    NavbarComponent,
    DatePipe,
    UploadComponent,
    ProductsUploadComponent,
    CardPictureComponent,
    InputFileComponent,
    ThumbnailPictureComponent,
  ],
  imports: [
    NgbPaginationModule, 
    NgbAlertModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatDatepickerModule,
    HttpClientModule,
    NgxSpinnerModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
