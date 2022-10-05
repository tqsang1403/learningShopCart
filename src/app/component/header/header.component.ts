import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public totalItem: number = 0;

  constructor(private cartService: CartService) {
    this.cartService.totalItems2.subscribe((item) => {
      this.totalItem = item.length;
    });

  }

  ngOnInit(): void {
    this.getLength1();
  }

  getLength1() {
    this.cartService.totalItems.subscribe((items) => {
      this.totalItem = items.length;
    })
  }




}
