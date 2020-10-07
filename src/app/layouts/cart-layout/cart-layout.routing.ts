import {Routes} from '@angular/router';
import {UserCartComponent} from '../../pages/cart/user-cart/user-cart.component';
import {CheckoutComponent} from '../../pages/cart/checkout/checkout.component';

export const CartLayoutRoutes: Routes = [
  {
    path: 'cart',
    component: UserCartComponent
  },
  {
    path: 'checkout',
    component: CheckoutComponent
  }
];
