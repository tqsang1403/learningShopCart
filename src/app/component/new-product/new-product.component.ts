import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { Product } from '../products/product';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit {

  public product: Product = {
    id: 0,
    name: '',
    quantity: 0,
    price: 0,
    description: '',
    imgUrl: ''
  };
  constructor(
    private router : Router,
    private productService : ApiService
  ) { }

  ngOnInit(): void {
    console.log(JSON.stringify(this.product));
  }

  cancel(){
    this.router.navigate(['products']);
  }

  on_press_key(data: any) {
    if (data !== '') {
      console.log('value nhận từ edit link ảnh: ' + data.target.value);
      console.log(data.target.value);
      let i: any;
      i = this.isImage(data.target.value)
      if (i) {
        this.product.imgUrl = data.target.value;
      } else {

        window.alert('Đường dẫn hình ảnh "' + data.target.value + '"' + ' không hợp lệ! Vui lòng nhập lại');
        this.product.imgUrl = '';
      }
    }else if(data === ''){
      console.log('chưa điền link ảnh');
    }



  }

  isImage(url: any) {
    return /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);
  }

  save() {
    this.productService.addProduct(this.product).subscribe((response : any) => {
      if(response){
        window.alert('Thêm mới sản phẩm thành công!');
        this.product = {
          id:0,
          name : '',
          price: 0,
          quantity : 0,
          description : '',
          imgUrl : ''
        };
      }else{
        window.alert(Error + response);
      }
    })

    console.log('sản phẩm sau khi nhập: '
      + JSON.stringify(
        this.product.name + ' /'
        + this.product.price + ' /'
        + this.product.quantity + ' /'
        + this.product.description + ' /'
        + this.product.imgUrl
      ))
  }

}
