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


  public cartData: Product[] = [];

  public totalItems = new BehaviorSubject<any>([]);

  addtoCart(product: Product) {
    let exist : any;
    if(this.cartData.length > 0){
      exist = this.cartData.find((item)=>{
        return item.id === product.id;
        console.log(exist);
      });
      if(exist){
        exist.quantity +=1;
        console.log(exist.quantity);
        console.log('cart when exist = true :', this.cartData);
      }else{
        this.cartData.push(product);
        product.quantity = 1;
        this.totalItems.next(this.cartData);
        console.log('total when exist = false :', this.totalItems);
        console.log('cart when exist = false :', this.cartData);
      }
    }else{
      this.cartData.push(product);
      product.quantity = 1;
      this.totalItems.next(this.cartData);

    }

      console.log('cart items: ',this.cartData);
      console.log('total: ',this.totalItems);
  }


  setCartData(data: any) {
    this.cartData.push(...data);
    this.totalItems.next(data);
  }
  getCartData() {
    return this.totalItems.asObservable();
  }


  GetTotalPrice(): number {
    let grandTotal = 0;

    return grandTotal;
  }

  removeItem(product: Product) {
    this.cartData.map((item : any, index : any) =>{
      if(product.id === item.id){
        this.cartData.splice(index,1);
        this.totalItems.next(this.cartData);
      }
    });

  }

  clearCart() {
    this.cartData = [];
    this.totalItems.next(this.cartData);
  }

}
