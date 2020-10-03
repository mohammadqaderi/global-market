import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SubCategoryDetailsComponent} from '../../pages/sub-category/sub-category-details/sub-category-details.component';
import {RouterModule} from '@angular/router';
import {SubCategoryLayoutRoutes} from './sub-category-layout.routing';
import {SharedModule} from '../../shared/shared-global.module';


@NgModule({
  declarations: [SubCategoryDetailsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(SubCategoryLayoutRoutes),
    SharedModule
  ]
})
export class SubCategoryLayoutModule {
}
