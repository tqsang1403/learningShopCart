import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CartComponent } from './component/cart/cart.component';
import { HeaderComponent } from './component/header/header.component';
import { ProductDetailComponent } from './component/product-detail/product-detail.component';
import { ProductsComponent } from './component/products/products.component';

import { NewProductComponent } from './component/new-product/new-product.component';
import { FormsModule } from '@angular/forms';
import { ProductEditComponent } from './component/product-edit/product-edit.component';



@NgModule({
  declarations: [
    AppComponent,
    CartComponent,
    ProductsComponent,
    HeaderComponent,
    ProductDetailComponent,
    NewProductComponent,
    ProductEditComponent,

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
