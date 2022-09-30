import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { CartService } from 'src/app/service/cart.service';
import { Product } from '../products/product';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {


  public cartItem: Product[] = [];
  public grandTotal !: number;
  public totalPrice: number = 0;
  public totalProduct: number = 0;
  public listproduct: Product[] = [];


  constructor(
    private cartService: CartService,
    private api: ApiService
  ) { }


  ngOnInit(): void {

    this.cartService.getCartData().subscribe((items: any) => {
      this.cartItem = items;
      if (this.cartItem) this.getTotal(this.cartItem);
    });

    this.api.getProduct().subscribe((res: any) => {
      this.listproduct = res;
    })

  }

  getTotal(Data: any) {
    let subs = 0;
    let subs2 = 0;
    for (let item of Data) {
      subs += item.price * item.quantity;
      subs2 += item.quantity;
      this.totalPrice = subs;
      this.totalProduct = subs2;
    }

  }

  removeItem(item: Product) {
    this.cartService.removeItem(item);
    console.log('remove ' + item.name);
    console.log('san pham con lai: ' + JSON.stringify(this.cartItem));
    this.getTotal(this.cartItem);
  }

  clear() {
    this.cartService.clearCart();
    this.cartItem = [];
    this.getTotal(this.cartItem);
  }
  validateInput(event: any, index: number) {
    let productQuantity: number = this.listproduct[index].quantity;
    const quantity = event.target.value;
    if (quantity > productQuantity) {
      window.alert('Số lượng không được lớn hơn số lượng sản phẩm có sẵn trong kho: ' + productQuantity);
      event.target.value = this.cartItem[index].quantity;
    }
    else {
      if (quantity < 1) {
        event.target.value = this.cartItem[index].quantity;
        return;
      }


      this.QuantityUpdate(quantity, index);
    }

  }

  private QuantityUpdate(quantity: number, index: number) {
    this.cartItem[index].quantity = quantity;

    this.getTotal(this.cartItem);

  }

  checkOut() {
    localStorage.setItem('mycart',JSON.stringify(this.cartItem));
    window.alert('Thanh toán đơn hàng thành công!');
    this.clear();
  }



}
