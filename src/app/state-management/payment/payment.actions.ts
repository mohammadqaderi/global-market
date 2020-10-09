import {PaymentModel} from '../../models/Payments/payment.model';

export interface PaymentStateModel {
  payments: PaymentModel[];
}

export namespace PaymentActions {

  export class FetchUserPayments {
    static readonly type = '[Payment] Fetch User Payments';

    constructor() {
    }
  }

  export class PushPayment {
    static readonly type = '[Payment] Push Payment';

    constructor(public payment: PaymentModel) {
    }
  }

  export class FetchPaymentById {
    static readonly type = '[Payment] Fetch Payment By Id';

    constructor(public id: number) {
    }
  }

  export class SetCustomerToken {
    static readonly type = '[Payment] Set Customer Token';

    constructor(public customerId: string) {
    }
  }

  export class ClearPaymentsFromStorage {
    static readonly type = '[Payment] Clear Payments From Storage';

    constructor() {
    }
  }
}
