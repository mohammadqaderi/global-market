import {Routes} from '@angular/router';
import {CategoryDetailsComponent} from '../../pages/category/category-details/category-details.component';

export const CategoryLayoutRoutes: Routes = [
  {
    path: 'categories/:id',
    component: CategoryDetailsComponent
  }
];
