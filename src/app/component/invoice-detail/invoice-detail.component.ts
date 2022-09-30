import { Component, OnInit } from '@angular/core';
import { InvoiceService } from 'src/app/service/invoice.service';

@Component({
  selector: 'app-invoice-detail',
  templateUrl: './invoice-detail.component.html',
  styleUrls: ['./invoice-detail.component.css']
})
export class InvoiceDetailComponent implements OnInit {

  invoice_list: any = [];
  invoice_detail_list: any;
  constructor(
    private invoiceService: InvoiceService,
  ) { }

  ngOnInit(): void {

    this.getInvoicesList();
  }

  getInvoicesList() {

    this.invoiceService.getInvoices().subscribe((res: any) => {
      this.invoice_list = res;
      console.log(JSON.stringify(this.invoice_list));
    })

  }


  getInvoice_Detail(id:number){
    this.invoiceService.getInvoice_Detail(id).subscribe((res: any) => {
      this.invoice_detail_list = res;
      console.log(JSON.stringify(this.invoice_detail_list));
    })
  }


}
