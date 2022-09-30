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
  public product2: any;
  listproduct: Product[] = [];
  listproduct2: Product[] = [];
  public soluongchon: number = 1;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private api: ApiService,
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    this.api.getProduct().subscribe((res: any) => {
      this.listproduct2 = res;
      console.log(JSON.stringify(this.listproduct));
    });

    this.listproduct = this.api.productList;

    this.subcription = this.route.params.subscribe((par: any) => {
      this._id = par['id'];
      console.log('id nhan duoc tu link :' + this._id);
    })

    this.product = this.listproduct.find(item => item.id === this._id);
    this.product2 = this.listproduct.find(item => item.id === this._id);
    console.log(JSON.stringify(this.product));



  }
  GoToList() {
    this.router.navigate(['products']);
  }

  // GetIDfromLink(){
  //   const routeParams = this.route.snapshot.paramMap;
  //   const idfromparams = Number(routeParams.get('id'));

  //   this.product = this.api.productList.find(product => product.id === idfromparams);

  //   console.log(JSON.stringify(this.product));
  //   console.log('id from params: ' + idfromparams);
  // }

  ngOnDestroy(): void {
    this.subcription = null;
    this._id = 0;
  }

  addtocart(product: Product) {
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
      window.alert('Số lượng mua không thể nhỏ hơn 1');
    } else {
      this.soluongchon--;
    }

  }

}
