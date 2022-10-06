import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { filter, map } from 'rxjs';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import { ApiService } from 'src/app/service/api.service';
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

    private route: ActivatedRoute,
    private api: ApiService
  ) { }

  ngOnInit(): void {
    this.getID();

    // this.invoiceService.getInvoice_Detail_List().subscribe((res: any) => {
    //   this.invoice_detail_list = res;
    //   console.log(
    //     'invoice detail list: ' + JSON.stringify(this.invoice_detail_list)
    //   );
    // });
    this.api.GetInvoiceDetail().subscribe((res: any) => {
      this.invoice_detail_list = res;
      this.invoice_detail_list_depend_on_id = this.invoice_detail_list.filter((a: any) => Number(a.ReceiptID) === Number(this.invoice_id));
    });


  }

  getID() {
    this.route.params.subscribe((res: any) => {
      this.invoice_id = res['id'];
      console.log('invoice id: ' + this.invoice_id);
    });
  }



  back() {
    history.back();
  }

  Print() {
    var data = document.getElementById('content')!;
    html2canvas(data).then(canvas => {
      // Few necessary setting options
      var imgWidth = 208;
      var pageHeight = 295;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      var heightLeft = imgHeight;
      var left = 5;
      var top = 10;
      const contentDataURL = canvas.toDataURL('image/png')
      let pdf = new jspdf.jsPDF('p', 'mm', 'a4'); // A4 size page of PDF
      var position = 0;
      pdf.addImage(contentDataURL, 'PNG', left, top, imgWidth, imgHeight)
      pdf.output('dataurlnewwindow');
      // pdf.save('new-file.pdf'); // Generated PDF


    });
  }
}
