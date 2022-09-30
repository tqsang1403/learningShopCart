import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { map, tap, catchError, Observable, throwError, of } from 'rxjs';
import { Product } from '../component/products/product';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  public productList: Product[] = [];

  private url = "https://633150d9cff0e7bf70ea4775.mockapi.io/api/products";

  getProduct() {
    return this.http.get<any>(this.url)
      .pipe(map((res: any) => {
        this.productList = res;
        return res;
      })
      )
  }

  addProduct(data: any): Observable<any> {
    return this.http.post<any>(this.url, data).pipe(
      tap((data: any) => console.log('add successful ' + JSON.stringify(data))),
      catchError(error => { return error })
    );
  }

  updateProduct(id: number, data: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.put<any>(this.url + '/' + id, data, httpOptions).pipe(
      tap((data: any) => console.log('edit successful ' + JSON.stringify(data))),
      catchError(error => { return error })
    );

  }

  deleteProduct(id: number): Observable<any> {
    return this.http.delete<any>(this.url + '/' + id).pipe(
      catchError(error => { return error })
    );
  }

}
