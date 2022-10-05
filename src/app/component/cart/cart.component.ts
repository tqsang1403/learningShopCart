import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Invoice, Invoice_Detail } from 'src/app/models/invoices';
import { ApiService } from 'src/app/service/api.service';
import { CartService } from 'src/app/service/cart.service';
import { InvoiceService } from 'src/app/service/invoice.service';
import { Product } from '../products/product';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {


  public cartItem: Product[] = [];

  public totalPrice: number = 0;
  public totalProduct: number = 0;
  public listproduct: Product[] = [];
  public createdDate: any = Date.now();
  public invoice: any;
  invoice_detail: any = [];


  constructor(
    private cartService: CartService,
    private api: ApiService,

    private invoiceService: InvoiceService
  ) {

  }


  ngOnInit(): void {

    //this.getCartfromLS();
    console.log('today: ' + this.createdDate);
    this.cartService.getCartData().subscribe((items: any) => {
      this.cartItem = items;
      if (this.cartItem) this.getTotal(this.cartItem);
    });

    this.api.getProduct().subscribe((res: any) => {
      this.listproduct = res;
    })

    this.cartItem.forEach
      ((a: any) => {

        this.invoice_detail.product_info = a,
          this.invoice_detail.invoice_id = 1

      }
      ); console.log(this.invoice_detail);;


  }




  getCartfromLS() {
    let arr: any = localStorage.getItem('carts');
    this.cartItem = JSON.parse(arr);
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
    this.getCartfromLS();
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
    let invoice: any = {

      uid: 1,
      createdDate: this.createdDate,
      Total: this.totalPrice,
    };
    var inv_dt = {
      invoice_id: invoice.id,
      product_id: 0,
      product_name: '',
      product_price: 0,
      product_quantity: 0,
    }


    let confirms = confirm('Bạn có muốn thanh toán giỏ hàng này không ?');
    if (confirms) {
      this.invoiceService.postInvoice(invoice).subscribe((res: any) => {
        if (res) {


          this.invoiceService.postInvoiceDetail(this.invoice_detail).subscribe((ress: any) => {
            localStorage.setItem('mycart', JSON.stringify(this.cartItem));
            localStorage.setItem('invoice', JSON.stringify(invoice));
            localStorage.setItem('invoice_detail', JSON.stringify(this.invoice_detail));

            window.alert('Thanh toán đơn hàng thành công!');
            this.clear();
          });

        }
      });

    }


  }

  /* public id: number,
  public name: string,
  public quantity: number,
  public price: number,
  public description: string,
  public imgUrl: string
*/



}
