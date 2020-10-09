import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StripeCheckoutComponent} from './components/stripe-checkout/stripe-checkout.component';
import {SharedModule} from '../../shared/shared-global.module';
import {NgxStripeModule} from 'ngx-stripe';


@NgModule({
  declarations: [StripeCheckoutComponent],
  imports: [
    CommonModule,
    SharedModule,
    NgxStripeModule
  ],
  exports: [
    StripeCheckoutComponent,
  ]
})
export class StripeIntegrationModule {
}
