import {Routes} from '@angular/router';
import {OrdersComponent} from '../../pages/orders/orders/orders.component';
import {OrderDetailsComponent} from '../../pages/orders/order-details/order-details.component';

export const OrderLayoutRoutes: Routes = [
  {
    path: 'orders',
    component: OrdersComponent,
  },
  {
    path: 'orders/:id',
    component: OrderDetailsComponent
  }
];
