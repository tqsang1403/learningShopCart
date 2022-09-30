import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { Product } from '../products/product';

@Component({
  selector: 'app-product-manager',
  templateUrl: './product-manager.component.html',
  styleUrls: ['./product-manager.component.css']
})
export class ProductManagerComponent implements OnInit {

  public product_list: Product[] = [];
  constructor(
    private api: ApiService,
    private router: Router

  ) { }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.api.getProduct().subscribe((res: any) => {
      this.product_list = res;
      console.log(JSON.stringify(this.product_list));
    });

  }

  deleteItem(id: number) {
    let confirmDelete = confirm('Bạn có muốn xóa sản phẩm này không ?');
    if (confirmDelete) {
      this.api.deleteProduct(id).subscribe((response: any) => {
        if (response) {
          window.alert('Xóa sản phẩm thành công !');
          this.getData();
        } else {
          console.log(response);
        }
      });
    }
    console.log(confirmDelete);
  }
}
