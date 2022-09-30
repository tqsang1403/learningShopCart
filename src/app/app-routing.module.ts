import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './component/cart/cart.component';
import { HomeComponent } from './component/home/home.component';
import { InvoiceDetailComponent } from './component/invoice-detail/invoice-detail.component';
import { InvoicesComponent } from './component/invoices/invoices.component';
import { NewProductComponent } from './component/new-product/new-product.component';
import { Notfound404Component } from './component/notfound404/notfound404.component';
import { ProductDetailComponent } from './component/product-detail/product-detail.component';
import { ProductEditComponent } from './component/product-edit/product-edit.component';
import { ProductManagerComponent } from './component/product-manager/product-manager.component';
import { ProductsComponent } from './component/products/products.component';


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'cart', component: CartComponent },
  { path: 'product-detail/:id', component: ProductDetailComponent },
  { path: 'new-product', component: NewProductComponent },
  { path: 'product-edit/:id', component: ProductEditComponent },
  { path: 'product-manager', component: ProductManagerComponent },
  { path: 'invoices', component: InvoicesComponent },
  { path: 'invoice/:id', component: InvoiceDetailComponent },
  { path: '**', component: Notfound404Component },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
