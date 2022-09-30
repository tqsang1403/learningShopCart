import { Component, OnInit } from '@angular/core';
import { Invoice } from 'src/app/models/invoices';
import { InvoiceService } from 'src/app/service/invoice.service';

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.css']
})
export class InvoicesComponent implements OnInit {
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

  clickTest(){

  }
}
