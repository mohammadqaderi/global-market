import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../../shared/shared-global.module';
import {RouterModule} from '@angular/router';
import {DashboardLayoutRoutes} from './dashboard-layout.routing';
import {HomeComponent} from '../../pages/dashboard/home/home.component';


@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(DashboardLayoutRoutes),
    SharedModule
  ]
})
export class DashboardModule {
}
