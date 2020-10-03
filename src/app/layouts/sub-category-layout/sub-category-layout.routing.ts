import {Routes} from '@angular/router';
import {SubCategoryDetailsComponent} from '../../pages/sub-category/sub-category-details/sub-category-details.component';

export const SubCategoryLayoutRoutes: Routes = [
  {
    path: 'sub-categories/:categoryId/:subCategoryId',
    component: SubCategoryDetailsComponent
  }
];
