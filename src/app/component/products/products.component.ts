import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { CartService } from 'src/app/service/cart.service';
import { CartComponent } from '../cart/cart.component';
import { Product } from './product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  public productList: Product[] = [];

  constructor(
    private api: ApiService,
    private cartService: CartService,

  ) { }

  ngOnInit(): void {
    this.api.getProduct().subscribe((res: any) => {
      this.productList = res;

    })



  }

  ngOnDestroy(): void {
    console.log('destroy component products');
  }

  addtoCart(item: Product) {

    this.cartService.addtoCart(item);

  }



}
