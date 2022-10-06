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
    private api: ApiService,
    private route: ActivatedRoute


  ) { }

  ngOnInit(): void {



    this.subcription = this.route.params.subscribe((par: any) => {
      this._id = par['id'];
      console.log('sub ' + this.subcription);
    });
    this.urlPhoto = this.api.urlPhoto;
    this.listproduct = this.api.getProduct().subscribe((res: any) => {
      this.listproduct = res;
      this.product = this.listproduct.find((item: any) => Number(item.ID) === Number(this._id));
      this.PhotoFilePath = this.urlPhoto + this.product.PhotoFileName;
      this.ProductName = this.product.ProdName;
      this.Price = this.product.Price;
      this.PhotoFileName = this.product.PhotoFileName
    });


  }

  public _id: number = 0;
  public subcription: any;
  public urlPhoto: any;
  public product: any;
  listproduct: any = [];
  ProductId!: string;
  ProductName!: string;
  Price!: number;
  PhotoFileName!: string;
  PhotoFilePath!: string;




  isImage(url: any) {
    return /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);
  }

  save() {
    var value = {
      ID: this.product.ID,
      ProdName: this.ProductName,
      Price: this.Price,
      PhotoFileName: this.PhotoFileName
    }
    this.productService.updateProduct(value).subscribe((response: any) => {
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
  uploadPhoto(event: any) {
    var file = event.target.files[0];
    const formData: FormData = new FormData();
    formData.append('uploadedFile', file, file.name);
    this.productService.uploadPhoto(formData).subscribe((data: any) => {
      this.PhotoFileName = data.toString();
      this.PhotoFilePath = this.productService.urlPhoto + this.PhotoFileName;
    })
  }

  cancel() {
    history.back();
  }


}
