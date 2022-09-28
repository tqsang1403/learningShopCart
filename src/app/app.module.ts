import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { CartComponent } from './component/cart/cart.component';
import { ProductsComponent } from './component/products/products.component';
import { HeaderComponent } from './component/header/header.component';
import { AppRoutingModule } from './app-routing.module';
import { ProductDetailComponent } from './component/product-detail/product-detail.component';



@NgModule({
  declarations: [
    AppComponent,
    CartComponent,
    ProductsComponent,
    HeaderComponent,
    ProductDetailComponent,

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
