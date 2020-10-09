import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProductDetailsComponent} from '../../pages/product/product-details/product-details.component';
import {RouterModule} from '@angular/router';
import {ProductLayoutRoutes} from './product-layout.routing';
import {SharedModule} from '../../shared/shared-global.module';


@NgModule({
  declarations: [ProductDetailsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(ProductLayoutRoutes),
    SharedModule
  ]
})
export class ProductLayoutModule {
}
