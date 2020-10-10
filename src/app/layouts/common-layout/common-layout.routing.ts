import {Routes} from '@angular/router';
import {SearchComponent} from '../../pages/common/search/search.component';

export const CommonLayoutRoutes: Routes = [
  {
    path: 'search/:name/:type',
    component: SearchComponent,
  },
];
