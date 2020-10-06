import {Routes} from '@angular/router';
import {HomeComponent} from '../../pages/dashboard/home/home.component';
import {UserProfileComponent} from '../../pages/dashboard/user-profile/user-profile.component';
import {UserAuthGuard} from '../../commons/guards/user-auth.guard';


export const DashboardLayoutRoutes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'user-profile',
    canActivate: [UserAuthGuard],
    component: UserProfileComponent
  }
];
