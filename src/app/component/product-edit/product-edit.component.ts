import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLinkActive } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { Product } from '../products/product';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {

  constructor(
    private router: Router,
    private productService: ApiService,
    private api : ApiService,
    private route : ActivatedRoute


  ) { }

  ngOnInit(): void {
    this.listproduct = this.api.productList;


    this.subcription = this.route.params.subscribe((par : any) =>
    {
      this._id = par['id'];
      console.log('sub ' +this.subcription);
    });

    this.product = this.listproduct.find((item: any) => item.id === this._id);
    console.log('san pham: ' + JSON.stringify(this.product));
  }

  public _id :number = 0;
  public subcription : any;

  public product :any ;
  listproduct : Product[] = [];

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
    } else if (data === '') {
      console.log('chưa điền link ảnh');
    }



  }

  isImage(url: any) {
    return /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);
  }

  save() {
    this.productService.updateProduct(this.product.id,this.product).subscribe((response: any) => {
      if (response) {
        window.alert('Sửa thông tin sản phẩm thành công!');
        history.back();
      } else {
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
  cancel() {
    history.back();
  }


}
