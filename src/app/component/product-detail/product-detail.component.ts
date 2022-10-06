import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Routes, } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { CartService } from 'src/app/service/cart.service';
import { Product } from '../products/product';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  public _id: number = 0;
  public subcription: any;

  public product: any;

  listproduct: any = [];

  public soluongchon: number = 1;
  public soluongsp: number = 0;
  public urlPhoto: any = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private api: ApiService,
    private cartService: CartService
  ) { }

  ngOnInit(): void {

    this.subcription = this.route.params.subscribe((par: any) => {
      this._id = par['id'];
      console.log('id nhan duoc tu link :' + this._id);
    });

    this.listproduct = this.api.getProduct().subscribe((res: any) => {
      this.listproduct = res;
      this.product = this.listproduct.find((item: any) => Number(item.ID) === Number(this._id));
    });

    this.urlPhoto = this.api.urlPhoto;

  }
  GoToList() {
    this.router.navigate(['products']);
  }




  ngOnDestroy(): void {
    this.subcription = null;
    this._id = 0;
  }

  addtocart(product: any) {
    if (this.soluongchon < 1) {
      window.alert('Số lượng mua phải lớn hơn 1!');
    } else {
      this.cartService.addtoCart(product, this.soluongchon);
      alert('Thêm sản phẩm vào giỏ hàng thành công!');
    }
  }


  tangsl() {
    this.soluongchon++;
  }
  giamsl() {
    if (this.soluongchon <= 1) {
      window.alert('Số lượng mua không thể nhỏ hơn 1 !');
    } else {
      this.soluongchon--;
    }

  }

}
