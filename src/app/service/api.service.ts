import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { map, tap, catchError, Observable, throwError, of } from 'rxjs';
import { Product } from '../component/products/product';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  public productList: any = [];

  readonly urlAPI = "http://localhost:44383/api/";
  readonly urlPhoto = "http://localhost:44383/Photos/";

  get() {
    return this.http.get<any>(this.urlAPI + 'product/getallproduct')
      .pipe(map((res: any) => {
        return res;
      })
      )
  }

  getProduct() {
    return this.http.get<any>(this.urlAPI + 'product/getallproduct')
      .pipe(map((res: any) => {
        this.productList = res;
        return res;
      })
      )
  }

  addProduct(data: any) {
    return this.http.post<any>(this.urlAPI + 'Product/CreateProduct', data).pipe(
      tap((data: any) => console.log('add successful ' + JSON.stringify(data))),
      catchError(error => { return error })
    );
  }

  // updateProduct(data: any): Observable<any> {
  //   const httpOptions = {
  //     headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  //   };
  //   return this.http.put<any>(this.urlAPI + 'Product/UpdateProduct/', data, httpOptions).pipe(
  //     tap((data: any) => console.log('edit successful ' + JSON.stringify(data))),
  //     catchError(error => { return error })
  //   );

  // }

  updateProduct(val: any) {
    return this.http.put(this.urlAPI + 'Product/UpdateProduct', val);
  }

  deleteProduct(id: number): Observable<any> {
    return this.http.delete<any>(this.urlAPI + 'Product/DeleteProduct/' + id).pipe(
      catchError(error => { return error })
    );
  }

  uploadPhoto(val: any) {
    return this.http.post(this.urlAPI + 'Product/SaveFile', val);
  }

  addInvoice(val: any) {
    return this.http.post(this.urlAPI + 'Receipt/CreateReceipt', val);
  }
  GetInvoice(): Observable<any[]> {
    return this.http.get<any>(this.urlAPI + 'Receipt/GetReceipt');
  }
  GetInvoiceDetail(): Observable<any[]> {
    return this.http.get<any>(this.urlAPI + 'ReceiptDetail/GetAllReceiptDetail');
  }

  // Chi tiết hóa đơn
  GetInvoiceDetailByID(val: any): Observable<any[]> {
    return this.http.get<any>(this.urlAPI + 'ReceiptDetail/GetDetailByRID/' + val)
  }
}
