import {Routes} from '@angular/router';
import {AllProductsComponent} from '../../pages/product/all-products/all-products.component';
import {ProductDetailsComponent} from '../../pages/product/product-details/product-details.component';


export const ProductLayoutRoutes: Routes = [
  {
    path: 'all-products',
    component: AllProductsComponent
  },
  {
    path: 'products/:productId/:subCategoryId',
    component: ProductDetailsComponent
  }
];
