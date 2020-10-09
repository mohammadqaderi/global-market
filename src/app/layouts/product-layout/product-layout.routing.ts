import {Routes} from '@angular/router';
import {ProductDetailsComponent} from '../../pages/product/product-details/product-details.component';


export const ProductLayoutRoutes: Routes = [
  {
    path: 'products/:productId/:subCategoryId',
    component: ProductDetailsComponent
  }
];
