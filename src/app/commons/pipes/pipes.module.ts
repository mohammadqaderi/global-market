import {NgModule} from '@angular/core';
import {CategoryPipe} from './category.pipe';
import {TagPipe} from './tag.pipe';
import {ProductFilterPipe} from './product-filter.pipe';


@NgModule({
  declarations: [CategoryPipe, TagPipe, ProductFilterPipe],
  exports: [CategoryPipe, TagPipe, ProductFilterPipe]
})
export class PipesModule {

}
