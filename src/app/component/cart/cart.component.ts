import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/service/cart.service';
import { Product } from '../products/product';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {


  public cartItem : Product[] = [];
  public grandTotal !: number;
  public totalPrice : number = 0;
  public totalProduct : number = 0;

  constructor(
    private cartService : CartService
  ) { }


  ngOnInit(): void {

    this.cartService.getCartData().subscribe((items : any)=>{
      this.cartItem = items;
      if(this.cartItem) this.getTotal(this.cartItem);
    });



  }

  getTotal(Data : any){
    let subs = 0;
    let subs2 = 0;
    for (let item of Data){
      subs += item.price * item.quantity;
      subs2 += item.quantity;
      this.totalPrice = subs;
      this.totalProduct = subs2;
    }

  }

  removeItem(item : Product){
    this.cartService.removeItem(item);
    console.log('remove ' + item.name);
    console.log('san pham con lai: '+ JSON.stringify(this.cartItem));
    this.getTotal(this.cartItem);
  }

  clear(){
    this.cartService.clearCart();
    this.cartItem = [];
    this.getTotal(this.cartItem);
  }
  validateInput(event : any, index:number){
    const quantity = event.target.value;
    if(quantity < 1){
      event.target.value = this.cartItem[index].quantity;
      return;
    }


    this.QuantityUpdate(quantity, index);
  }

  private QuantityUpdate(quantity :number , index: number){
    this.cartItem[index].quantity = quantity;

    this.getTotal(this.cartItem);

  }

  checkOut(){
    window.alert('Thanh toán đơn hàng thành công!');
    this.clear();
  }


}
