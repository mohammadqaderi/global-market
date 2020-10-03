import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {TagLayoutRoutes} from './tag-layout.routing';
import {SharedModule} from '../../shared/shared-global.module';
import {TagsComponent} from '../../pages/tag/tags/tags.component';
import {TagItemsComponent} from '../../pages/tag/tag-items/tag-items.component';


@NgModule({
  declarations: [TagsComponent, TagItemsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(TagLayoutRoutes),
    SharedModule
  ]
})
export class TagLayoutModule {
}
