import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {CommonLayoutRoutes} from './common-layout.routing';
import {SharedModule} from '../../shared/shared-global.module';
import {SearchComponent} from '../../pages/common/search/search.component';


@NgModule({
  declarations: [SearchComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(CommonLayoutRoutes),
    SharedModule
  ]
})
export class CommonLayoutModule {
}
