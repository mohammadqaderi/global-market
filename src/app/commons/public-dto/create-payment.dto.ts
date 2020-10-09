import {PaymentMethod} from '../enums/payment-method.enum';
export class CreatePaymentDto {
  paymentMethod: PaymentMethod;
  stripeData: {
    amount: number,
    source: any,
    description: string
  };
}
