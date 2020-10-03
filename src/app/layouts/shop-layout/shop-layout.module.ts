import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ShopComponent} from '../../pages/shop/shop/shop.component';
import {RouterModule} from '@angular/router';
import {ShopLayoutRoutes} from './shop-layout.routing';
import {SharedModule} from '../../shared/shared-global.module';


@NgModule({
  declarations: [ShopComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(ShopLayoutRoutes),
    SharedModule
  ]
})
export class ShopLayoutModule {
}
