import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../component/products/product';
import { ApiService } from './api.service';


@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private api: ApiService) {
    this.getCartData();
  }


  public cartItem: Product[] = [];


  public totalItems = new BehaviorSubject<any>([]);

  addtoCart(product: Product) {
    let exist : any;
    if(this.cartItem.length > 0){
      exist = this.cartItem.find((item)=>{
        return item.id === product.id;
        console.log(exist);
      });
      if(exist){
        exist.quantity +=1;
        console.log(exist.quantity);
        console.log('cart when exist = true :', this.cartItem);
      }else{
        this.cartItem.push(product);
        this.totalItems.next(this.cartItem);
        console.log('total when exist = false :', this.totalItems);
        console.log('cart when exist = false :', this.cartItem);
      }
    }else{
      this.cartItem.push(product);
      this.totalItems.next(this.cartItem);

    }

      console.log('cart items: ',this.cartItem);
      console.log('total: ',this.totalItems);
  }


  setCartData(data: any) {
    this.cartItem.push(...data);
    this.totalItems.next(data);
  }
  getCartData() {
    return this.totalItems.asObservable();
  }


  GetTotalPrice(): number {
    let grandTotal = 0;

    return grandTotal;
  }

  removeCartItem(product: any) {


  }

  clearCart() {
    this.cartItem = [];
  }

  getcountitem() {
    this.cartItem.length;
  }
  getItemCart() {
    return this.cartItem;
  }
}
