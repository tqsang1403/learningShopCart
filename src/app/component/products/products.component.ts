import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { CartService } from 'src/app/service/cart.service';
import { CartComponent } from '../cart/cart.component';
import { Product } from './product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  public productList: Product[] = [];
  public soluongchon: number = 1;

  constructor(private api: ApiService, private cartService: CartService) {}

  ngOnInit(): void {
    this.api.getProduct().subscribe((res: any) => {
      this.productList = res;
    });
  }

  ngOnDestroy(): void {
    console.log('destroy component products');
  }

  addtoCart(item: Product) {
    if (this.soluongchon < 1) {
      window.alert('Số lượng mua phải lớn hơn 1!');
      this.soluongchon = 1;
    } else {
      this.cartService.addtoCart(item, this.soluongchon);



      this.soluongchon = 1;
    }
  }

  tangsl() {
    this.soluongchon++;
  }
  giamsl() {
    if (this.soluongchon <= 1) {
      window.alert('Số lượng mua không thể nhỏ hơn 1');

    } else {
      this.soluongchon--;
    }
  }
}
