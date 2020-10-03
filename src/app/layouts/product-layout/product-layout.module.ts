import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AllProductsComponent} from '../../pages/product/all-products/all-products.component';
import {ProductDetailsComponent} from '../../pages/product/product-details/product-details.component';
import {RouterModule} from '@angular/router';
import {ProductLayoutRoutes} from './product-layout.routing';
import {SharedModule} from '../../shared/shared-global.module';


@NgModule({
  declarations: [AllProductsComponent, ProductDetailsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(ProductLayoutRoutes),
    SharedModule
  ]
})
export class ProductLayoutModule {
}
