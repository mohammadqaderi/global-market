import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {CategoryLayoutRoutes} from './category-layout.routing';
import {SharedModule} from '../../shared/shared-global.module';
import {CategoryDetailsComponent} from '../../pages/category/category-details/category-details.component';


@NgModule({
  declarations: [CategoryDetailsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(CategoryLayoutRoutes),
    SharedModule
  ]
})
export class CategoryLayoutModule {
}
