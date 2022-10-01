import { Component, OnInit } from '@angular/core';
import { filter, map } from 'rxjs';
import { Invoice, Invoice_Detail } from 'src/app/models/invoices';
import { InvoiceService } from 'src/app/service/invoice.service';

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.css']
})
export class InvoicesComponent implements OnInit {
  invoice_list: any = [];
  invoice_detail_list: Invoice_Detail[] = [];
  invoice_detail_list_depend_on_id: any = [];
  invoice_id : any;
  constructor(
    private invoiceService: InvoiceService,
  ) { }

  ngOnInit(): void {

    this.getInvoicesList();
    this.get_invoice_detail_list()
  }

  getInvoicesList() {

    this.invoiceService.getInvoices().subscribe((res: any) => {
      this.invoice_list = res;

    })

  }


  getInvoice_Detail(id:any) {
    this.invoice_id = 1;
    this.invoice_detail_list_depend_on_id = this.invoice_detail_list.filter((a:any) => a.invoice_id === Number(id));
    console.log('id nhan duoc khi click: ' +  id);
    console.log('chi tiet hoa don co: ' + JSON.stringify(this.invoice_detail_list_depend_on_id));
  }


  get_invoice_detail_list() {
    this.invoiceService.getInvoice_Detail_List().subscribe((res: any) => {
      this.invoice_detail_list = res;
      console.log(JSON.stringify(this.invoice_detail_list));
    })
  }

  clickTest() {

  }
}
