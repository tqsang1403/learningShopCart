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

    this.getCartData();
  }

  public list_product_from_api: Product[] = [];
  public cartData: any = [];

  public totalItems = new BehaviorSubject<any>([]);

  // addtoCart(product: Product, soluong: number) {
  //   let exist: any;
  //   let prod: any;
  //   if (this.cartData.length > 0) {
  //     exist = this.cartData.find(
  //       (item) => {

  //         return item.id === product.id;
  //       },
  //       (prod = this.list_product_from_api.find((item) => {

  //         return product.id === item.id;
  //       }))
  //     );

  //     let itemQuantity: number;
  //     itemQuantity = prod.quantity;

  //     console.log('so luong sp co san: ' + itemQuantity);
  //     console.log('so luong sp khach chon : ' + soluong);

  //     if (exist) {
  //       let tongtamtinh: number = exist.quantity + soluong;
  //       console.log('tổng tạm tính: ' + tongtamtinh);
  //       if (tongtamtinh > itemQuantity) {
  //         window.alert('Số lượng mua không thể lớn hơn số lượng sản phẩm hiện có là: ' + itemQuantity);
  //         exist.quantity = exist.quantity;
  //         this.setLs(this.cartData);
  //       } else {
  //         window.alert('Thêm sản phẩm vào giỏ hàng thành công!');
  //         exist.quantity += soluong;
  //         this.setLs(this.cartData);
  //       }
  //     } else {
  //       if (soluong > itemQuantity) {
  //         window.alert('số lượng mua không thể lớn hơn số lượng sản phẩm hiện có là: ' + itemQuantity);
  //       } else {
  //         window.alert('Thêm sản phẩm vào giỏ hàng thành công!');
  //         product.quantity = soluong;
  //         this.cartData.push(product);
  //         this.totalItems.next(this.cartData);
  //         this.setLs(this.cartData);
  //       }
  //     }
  //   } else {
  //     if (soluong > product.quantity) {
  //       window.alert('số lượng mua không thể lớn hơn số lượng sản phẩm hiện có là: ' + product.quantity);
  //     } else {
  //       window.alert('Thêm sản phẩm vào giỏ hàng thành công!');
  //       this.cartData.push(product);
  //       //bị hiểu nhầm khi chưa có sản phẩm sẽ gán luôn giá trị trong array = số lượng chọn tay
  //       product.quantity = soluong;
  //       this.totalItems.next(this.cartData);
  //       this.setLs(this.cartData);
  //     }
  //   }
  // }
  addtoCart(data: any, sl: number) {
    if (this.cartData.length === 0) {
      data.amount = sl;
      this.cartData.push(data);
      this.totalItems.next(this.cartData);
      this.setLs(this.cartData);
    } else {
      var exist = this.cartData.find((item: any) => Number(item.ID) === Number(data.ID));
      if (exist) {
        exist.amount += sl;
        this.setLs(this.cartData);
        this.totalItems.next(this.cartData);
      } else {
        data.amount = sl;
        this.cartData.push(data);
        this.setLs(this.cartData);
        this.totalItems.next(this.cartData);
      }
    }
    this.setLs(this.cartData);
    this.totalItems.next(this.cartData);
  }

  setLs(data: any) {
    localStorage.setItem('gio-hang', JSON.stringify(data));
  }


  setCartData(data: any) {
    this.cartData.push(...data);
    this.totalItems.next(data);
  }
  getCartData() {
    return this.totalItems.asObservable();
  }


  removeItem(product: any) {
    this.cartData.map((item: any, index: any) => {
      if (product.ID === item.ID) {
        this.cartData.splice(index, 1);

      }
    });
    this.setLs(this.cartData);
    this.totalItems.next(this.cartData);
  }

  clearCart() {
    this.cartData = [];
    this.totalItems.next(this.cartData);
    localStorage.removeItem('gio-hang');
  }



}
