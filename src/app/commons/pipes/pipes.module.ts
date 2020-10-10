import {NgModule} from '@angular/core';
import {CategoryPipe} from './category.pipe';
import {TagPipe} from './tag.pipe';
import {ProductFilterPipe} from './product-filter.pipe';
import {GeneralPipe} from './general.pipe';


@NgModule({
  declarations: [CategoryPipe, TagPipe, ProductFilterPipe, GeneralPipe],
  exports: [CategoryPipe, TagPipe, ProductFilterPipe, GeneralPipe]
})
export class PipesModule {

}
