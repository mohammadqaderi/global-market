import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {CommonLayoutRoutes} from './common-layout.routing';
import {SharedModule} from '../../shared/shared-global.module';
import {SearchComponent} from '../../pages/common/search/search.component';
import {SearchBarComponent} from '../../pages/common/search-bar/search-bar.component';
import {PipesModule} from '../../commons/pipes/pipes.module';


@NgModule({
  declarations: [SearchComponent, SearchBarComponent],
  exports: [
    SearchBarComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(CommonLayoutRoutes),
    SharedModule,
    PipesModule
  ]
})
export class CommonLayoutModule {
}
