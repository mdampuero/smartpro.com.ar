import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule,NgbTooltipModule,NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './pages/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { NgxSpinnerModule } from 'ngx-spinner';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './pages/home/home.component';
import { NavbarComponent } from './components/utils/navbar/navbar.component';
import { CardProductComponent } from './components/utils/card-product/card-product.component';
import { MenuCategoriesComponent } from './components/utils/menu-categories/menu-categories.component';
import { FiltersComponent } from './components/utils/filters/filters.component';
import { CarouselComponent } from './components/utils/carousel/carousel.component';
import { SearchComponent } from './components/utils/search/search.component';
import { FooterComponent } from './components/utils/footer/footer.component';
import { ProductsComponent } from './pages/products/products.component';
import { FormatNumberPipe } from './pipes/format-number.pipe';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { CartComponent } from './pages/cart/cart.component';
import { TermsComponent } from './pages/terms/terms.component';
import { AboutComponent } from './pages/about/about.component';
import { CartItemComponent } from './components/utils/cart-item/cart-item.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { CheckoutItemComponent } from './components/utils/checkout-item/checkout-item.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { DetailProductComponent } from './components/utils/detail-product/detail-product.component';
import { AccountComponent } from './pages/account/account.component';
import { CartfullComponent } from './components/utils/cartfull/cartfull.component';
import { PinchZoomModule } from 'ngx-pinch-zoom';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {Nl2BrPipeModule} from 'nl2br-pipe';
import { FeeedbackComponent } from './pages/feeedback/feeedback.component';
import { PayComponent } from './pages/pay/pay.component';
import { ContactComponent } from './pages/contact/contact.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    HomeComponent,
    ProductsComponent,
    CardProductComponent,
    MenuCategoriesComponent,
    FiltersComponent,
    CarouselComponent,
    SearchComponent,
    FooterComponent,
    FormatNumberPipe,
    CartComponent,
    TermsComponent,
    AboutComponent,
    CartItemComponent,
    CheckoutComponent,
    CheckoutItemComponent,
    ProductDetailComponent,
    DetailProductComponent,
    AccountComponent,
    CartfullComponent,
    FeeedbackComponent,
    PayComponent,
    ContactComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxSpinnerModule,
    MatSnackBarModule,
    NgbModule,
    NgbTooltipModule,
    NgbDropdownModule,
    FormsModule,
    PinchZoomModule,
    BrowserAnimationsModule,
    NgxSliderModule,
    Nl2BrPipeModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
