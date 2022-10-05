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
import { ProductManagerComponent } from './component/product-manager/product-manager.component';
import { Notfound404Component } from './component/notfound404/notfound404.component';
import { InvoicesComponent } from './component/invoices/invoices.component';
import { InvoiceDetailComponent } from './component/invoice-detail/invoice-detail.component';
import { HomeComponent } from './component/home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';


@NgModule({
  declarations: [
    AppComponent,
    CartComponent,
    ProductsComponent,
    HeaderComponent,
    ProductDetailComponent,
    NewProductComponent,
    ProductEditComponent,
    ProductManagerComponent,
    Notfound404Component,
    InvoicesComponent,
    InvoiceDetailComponent,
    HomeComponent,


  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
