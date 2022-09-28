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
  public total : number = 0;
  constructor(
    private cartService : CartService
  ) { }


  ngOnInit(): void {

    this.cartItem = this.cartService.getItemCart();

  }

  removeItem(i : any){

  }

  clear(){
    this.cartService.clearCart();
    this.cartItem = [];
  }

}
