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


  public cartItem: any = [];

  public totalPrice: number = 0;
  public totalProduct: number = 0;
  public listproduct: Product[] = [];
  public createdDate: any = Date.now().toLocaleString();
  public invoice: any;
  public invoice_detail: any = [];

  customer = {
    Name: '',
    Phone: '',
    Address: '',
    Email: ''
  }
  public idk = {
    ProdID: 0,
    Amount: 0,
    IntoMoney: 0,
    Product: null
  }

  // "ID": 1,
  //       "CreateDate": "2022-09-13T10:14:04",
  //       "CreateStaff": "Nguyễn Hoàng Hiệp",
  //       "TotalMoney": 55000,


  constructor(
    private cartService: CartService,
    private api: ApiService,


  ) {

  }


  ngOnInit(): void {

    this.getCartfromLS();
    // console.log('today: ' + this.createdDate);
    // this.cartService.getCartData().subscribe((items: any) => {
    //   this.cartItem = items;
    //   if (this.cartItem) this.getTotal(this.cartItem);
    // });

    this.api.getProduct().subscribe((res: any) => {
      this.listproduct = res;
    })

    if (this.cartItem) this.getTotal(this.cartItem);



  }



  getCartfromLS() {
    let arr: any = localStorage.getItem('gio-hang');
    this.cartItem = JSON.parse(arr);
    console.log(this.cartItem);
  }
  gettotalamount(data: any) {
    for (let item of data) {
      this.totalProduct += item.amount;
    }
  }

  getTotal(Data: any) {

    for (let item of Data) {
      this.totalPrice += item.Price * item.amount;

    }

  }

  removeItem(item: any) {
    this.cartService.removeItem(item);
    console.log('remove ' + item);
    console.log('san pham con lai: ' + JSON.stringify(this.cartItem));
    this.getTotal(this.cartItem);
    this.gettotalamount(this.cartItem);
    this.getCartfromLS();
  }

  clear() {
    this.cartService.clearCart();
    this.cartItem = [];
    this.getTotal(this.cartItem);
    this.gettotalamount(this.cartItem);
  }
  // validateInput(event: any, index: number) {
  //   let productQuantity: number = this.listproduct[index].quantity;
  //   const quantity = event.target.value;
  //   if (quantity > productQuantity) {
  //     window.alert('Số lượng không được lớn hơn số lượng sản phẩm có sẵn trong kho: ' + productQuantity);
  //     event.target.value = this.cartItem[index].quantity;
  //   }
  //   else {
  //     if (quantity < 1) {
  //       event.target.value = this.cartItem[index].quantity;
  //       return;
  //     }


  //     this.QuantityUpdate(quantity, index);
  //   }

  // }
  validateInput(event: any, index: number) {

    const quantity = event.target.value;
    if (quantity == 0) {

      let a = confirm('bạn có muốn xóa sản phẩm này không ?');
      if (a) {
        this.removeItem(this.cartItem[index]);
        this.QuantityUpdate(quantity, index);
      }
    }
    this.QuantityUpdate(quantity, index);
  }

  private QuantityUpdate(quantity: number, index: number) {
    this.cartItem[index].amount = quantity;
    this.gettotalamount(this.cartItem);
    this.getTotal(this.cartItem);

  }
  checkOut() {
    this.cartItem.forEach((item: any) => {
      this.idk.Amount = item.amount,
        this.idk.ProdID = item.ID,
        this.idk.IntoMoney = item.Price * item.amount,
        this.idk.Product = null,
        this.invoice_detail.push(this.idk),
        this.idk = {
          ProdID: 0,
          Amount: 0,
          IntoMoney: 0,
          Product: null
        }
    });
    let invoice: any = {
      CreateDate: this.createdDate,
      CreateStaff: this.customer.Name,
      TotalMoney: this.totalPrice,
      ReceiptDetails: this.invoice_detail
    };

    let confirms = confirm('Bạn có muốn thanh toán giỏ hàng này không ?');
    if (confirms) {
      this.api.addInvoice(invoice).subscribe(res => {
        alert(res.toString());
      });
      this.invoice_detail = [];
      localStorage.setItem('don-hang-vua-thanh-toan', JSON.stringify(invoice));
      window.alert('Thanh toán đơn hàng thành công!');
      this.clear();
    }
  }
}

