import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InvoiceService } from 'src/app/service/invoice.service';
import { filter, map } from 'rxjs';
@Component({
  selector: 'app-invoice-detail',
  templateUrl: './invoice-detail.component.html',
  styleUrls: ['./invoice-detail.component.css'],
})
export class InvoiceDetailComponent implements OnInit {
  invoice_list: any = [];
  invoice_detail_list: any = [];
  invoice_detail_list_depend_on_id: any = [];
  public invoice_id: any;
  constructor(
    private invoiceService: InvoiceService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getID();

    // this.invoiceService.getInvoice_Detail_List().subscribe((res: any) => {
    //   this.invoice_detail_list = res;
    //   console.log(
    //     'invoice detail list: ' + JSON.stringify(this.invoice_detail_list)
    //   );
    // });
    this.invoice_detail_list = this.invoiceService.invoice_detail_list;

    this.getInvoice();
  }

  getID() {
    this.route.params.subscribe((res: any) => {
      this.invoice_id = res['id'];
      console.log('invoice id: ' + this.invoice_id);
    });
  }

  getInvoice() {
    this.invoice_detail_list_depend_on_id = this.invoice_detail_list.filter(
      (d: any) => d.invoice_id === Number(this.invoice_id)
    );
    console.log(
      'invoice_on_id: ' + JSON.stringify(this.invoice_detail_list_depend_on_id)
    );
  }

  back() {
    history.back();
  }
}
