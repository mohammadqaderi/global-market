import {InvoiceModel} from '../../models/Invoice/invoice.model';
import {PaymentModel} from '../../models/Payments/payment.model';

export interface InvoiceStateModel {
  invoices: InvoiceModel[];
}

export namespace InvoiceActions {

  export class FetchUserInvoices {
    static readonly type = '[Invoice] Fetch User Invoices';

    constructor() {
    }
  }

  export class PushInvoice {
    static readonly type = '[Invoice] Push Invoice';

    constructor(public invoice: InvoiceModel) {
    }
  }

  export class FetchInvoiceById {
    static readonly type = '[Invoice] Fetch Invoice By Id';

    constructor(public id: number) {
    }
  }

  export class ClearInvoicesFromStorage {
    static readonly type = '[Invoice] Clear Invoices From Storage';

    constructor() {
    }
  }
}
