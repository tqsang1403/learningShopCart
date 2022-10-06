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

  public product = {
    ProdName: '',
    Price: 0,
    PhotoFileName: ''
  };

  ProductId!: string;
  ProductName!: string;
  Price!: number;
  PhotoFileName!: string;
  PhotoFilePath!: string;
  url: any;
  constructor(
    private router: Router,
    private productService: ApiService
  ) { }

  ngOnInit(): void {
    console.log(JSON.stringify(this.product));
    this.url = this.productService.urlPhoto;
  }

  cancel() {
    this.router.navigate(['products']);
  }

  isImage(url: any) {
    return /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);
  }

  save() {
    var val = {

      ProdName: this.ProductName,
      Price: this.Price,
      PhotoFileName: this.PhotoFileName
    }
    this.productService.addProduct(val).subscribe((response: any) => {
      if (response) {
        window.alert('Thêm mới sản phẩm thành công!');
        this.ProductName = '';
        this.Price = 0;
        this.PhotoFileName = '';
      } else {
        alert('Thêm sản phẩm thất bại! hãy thử lại!');
      }
    })

    console.log('sản phẩm sau khi nhập: ' + JSON.stringify(this.product));
  }

  uploadPhoto(event: any) {
    var file = event.target.files[0];


    const formData: FormData = new FormData();
    formData.append('uploadedFile', file, file.name);

    this.productService.uploadPhoto(formData).subscribe((data: any) => {
      this.PhotoFileName = data.toString();
      this.PhotoFilePath = this.productService.urlPhoto + this.PhotoFileName;
    })
  }
}
