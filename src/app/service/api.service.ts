import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map ,tap,catchError } from 'rxjs';
import { Product } from '../component/products/product';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  public productList : Product[] = [];

  private url = "https://633150d9cff0e7bf70ea4775.mockapi.io/api/products";

  getProduct() {
    return this.http.get<Product>(this.url)
      .pipe(map((res: any) => {
        this.productList = res;
        return res;

      })
      )}

}
