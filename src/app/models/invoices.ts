export class Invoice {
  constructor(id: number, uid: number, createdDate: Date, Total: number) {}
}

export class Invoice_Detail {
  constructor(
    id: number,
    invoice_id: number,
    product_id: number,
    product_name: string,

    product_price: number,
    product_quantity: number
  ) {}
}
