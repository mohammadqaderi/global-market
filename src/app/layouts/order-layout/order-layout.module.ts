import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {OrdersComponent} from '../../pages/orders/orders/orders.component';
import {OrderDetailsComponent} from '../../pages/orders/order-details/order-details.component';
import {RouterModule} from '@angular/router';
import {OrderLayoutRoutes} from './order-layout.routing';
import {SharedModule} from '../../shared/shared-global.module';


@NgModule({
  declarations: [OrdersComponent, OrderDetailsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(OrderLayoutRoutes),
    SharedModule
  ]
})
export class OrderLayoutModule {
}
