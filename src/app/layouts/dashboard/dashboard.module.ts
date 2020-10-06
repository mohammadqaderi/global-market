import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../../shared/shared-global.module';
import {RouterModule} from '@angular/router';
import {DashboardLayoutRoutes} from './dashboard-layout.routing';
import {HomeComponent} from '../../pages/dashboard/home/home.component';
import {UserProfileComponent} from '../../pages/dashboard/user-profile/user-profile.component';
import {CreateUserProfileComponent} from '../../pages/dashboard/create-user-profile/create-user-profile.component';


@NgModule({
  declarations: [HomeComponent, UserProfileComponent, CreateUserProfileComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(DashboardLayoutRoutes),
    SharedModule
  ]
})
export class DashboardModule {
}
