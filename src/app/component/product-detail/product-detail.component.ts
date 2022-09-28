import { Component, OnInit } from '@angular/core';
import {  ActivatedRoute, Router, Routes, } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { CartService } from 'src/app/service/cart.service';
import { Product } from '../products/product';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  public _id :number = 0;
  public subcription : any;

  public product :any ;
  listproduct : Product[] = [];

  constructor(
    private router : Router,
    private route : ActivatedRoute,
    private api : ApiService,
    private cartService : CartService
  ) { }

  ngOnInit(): void {
    this.listproduct =this.api.productList;

    this.subcription = this.route.params.subscribe((par : any) => {
      this._id = par['id'];
      console.log('id nhan duoc tu link :' +  this._id);
    })

    this.product = this.listproduct.find(product => product.id === this._id);




  }
  GoToList(){
    this.router.navigate(['products']);
  }

  GetIDfromLink(){
    const routeParams = this.route.snapshot.paramMap;
    const idfromparams = Number(routeParams.get('id'));

    this.product = this.api.productList.find(product => product.id === idfromparams);

    console.log(JSON.stringify(this.product));
    console.log('id from params: ' + idfromparams);
  }

  ngOnDestroy(): void {
    this.subcription = null;
    this._id = 0;
    console.log(this.subcription + this._id);
  }

  addtocart(product : Product){
    this.cartService.addtoCart(product);
    console.log( 'Thêm sản phẩm vào giỏ hàng thành công!');
  }

}
