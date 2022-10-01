import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, tap } from 'rxjs';
import { Invoice } from '../models/invoices';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
  public invoice_list: Invoice[] = [];
  public invoice_detail_list: any;

  constructor(
    private http: HttpClient
  ) { }

  private urlInvoices = "https://633150d9cff0e7bf70ea4775.mockapi.io/api/invoices";
  private urlInvoice_detail = 'https://633150d9cff0e7bf70ea4775.mockapi.io/api/invoice_detail';

  getInvoices() {
    return this.http.get<any>(this.urlInvoices).pipe(
      map((res: any) => {
      this.invoice_list = res;

      return res;
    })
    );
  }

  getInvoice_Detail(id: number) {
     return this.http.get<any>(this.urlInvoice_detail + '/' + id).pipe(tap((res: any) => {
      this.invoice_detail_list = res;
    })
    );
  }

  getInvoice_Detail_List(){
    return this.http.get<any>(this.urlInvoice_detail).pipe(tap((res: any) => {
     this.invoice_detail_list = res;
   })
   );
 }


}
