import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../component/products/product';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(
    private api: ApiService
  ) {
    this.getListProduct();
    this.getCartData();
  }

  public list_product_from_api: Product[] = [];
  public cartData: Product[] = [];

  public totalItems = new BehaviorSubject<any>([]);
  public totalItems2 = new BehaviorSubject<any>([]);
  addtoCart(product: Product, soluong: number) {
    let exist: any;
    let prod: any;
    if (this.cartData.length > 0) {
      exist = this.cartData.find(
        (item) => {

          return item.id === product.id;
        },
        (prod = this.list_product_from_api.find((item) => {

          return product.id === item.id;
        }))
      );

      let itemQuantity: number;
      itemQuantity = prod.quantity;

      console.log('so luong sp co san: ' + itemQuantity);
      console.log('so luong sp khach chon : ' + soluong);

      if (exist) {
        let tongtamtinh: number = exist.quantity + soluong;
        console.log('tổng tạm tính: ' + tongtamtinh);
        if (tongtamtinh > itemQuantity) {
          window.alert('Số lượng mua không thể lớn hơn số lượng sản phẩm hiện có là: ' + itemQuantity);
          exist.quantity = exist.quantity;
          this.setLs(this.cartData);
        } else {
          window.alert('Thêm sản phẩm vào giỏ hàng thành công!');
          exist.quantity += soluong;
          this.setLs(this.cartData);
        }
      } else {
        if (soluong > itemQuantity) {
          window.alert('số lượng mua không thể lớn hơn số lượng sản phẩm hiện có là: ' + itemQuantity);
        } else {
          window.alert('Thêm sản phẩm vào giỏ hàng thành công!');
          product.quantity = soluong;
          this.cartData.push(product);
          this.totalItems.next(this.cartData);
          this.setLs(this.cartData);

        }
      }
    } else {
      if (soluong > product.quantity) {
        window.alert('số lượng mua không thể lớn hơn số lượng sản phẩm hiện có là: ' + product.quantity);
      } else {
        window.alert('Thêm sản phẩm vào giỏ hàng thành công!');
        this.cartData.push(product);
        //bị hiểu nhầm khi chưa có sản phẩm sẽ gán luôn giá trị trong array = số lượng chọn tay
        product.quantity = soluong;
        this.totalItems.next(this.cartData);
        this.setLs(this.cartData);
      }
    }
  }

  setLs(data: any) {
    localStorage.setItem('carts', JSON.stringify(data));
  }
  getListProduct() {
    this.api.getProduct().subscribe((res: any) => {
      return this.list_product_from_api = res;
    });
  }

  setCartData(data: any) {
    this.cartData.push(...data);
    this.totalItems.next(data);
  }
  getCartData() {
    return this.totalItems.asObservable();
  }


  removeItem(product: Product) {
    this.cartData.map((item: any, index: any) => {
      if (product.id === item.id) {
        this.cartData.splice(index, 1);
        this.totalItems.next(this.cartData);
      }
    });
    this.setLs(this.cartData);
  }

  clearCart() {
    this.cartData = [];
    this.totalItems.next(this.cartData);
    localStorage.removeItem('carts');
  }



  getlength() {
    let a: any = localStorage.getItem('carts');
    this.totalItems2 = JSON.parse(a);
    return this.totalItems2;
  }
}
