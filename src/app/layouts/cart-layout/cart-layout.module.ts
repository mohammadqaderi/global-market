import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserCartComponent} from '../../pages/cart/user-cart/user-cart.component';
import {RouterModule} from '@angular/router';
import {CartLayoutRoutes} from './cart-layout.routing';
import {SharedModule} from '../../shared/shared-global.module';
import {CheckoutComponent} from '../../pages/cart/checkout/checkout.component';
import {StripeIntegrationModule} from '../../modules/stripe-integration/stripe-integration.module';


@NgModule({
  declarations: [UserCartComponent, CheckoutComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(CartLayoutRoutes),
    SharedModule,
    StripeIntegrationModule
  ]
})
export class CartLayoutModule {
}
