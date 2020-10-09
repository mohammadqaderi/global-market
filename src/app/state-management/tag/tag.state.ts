import {Action, Selector, State, StateContext} from '@ngxs/store';
import {TagActions, TagStateModel} from './tag.actions';
import {Injectable} from '@angular/core';
import {TagService} from '../../services/tag/tag.service';
import {tap} from 'rxjs/operators';
import ClearTags = TagActions.ClearTags;
import FetchSubCategoriesTags = TagActions.FetchSubCategoriesTags;
import {SubCategoryTagModel} from '../../models/Categories/sub-category-tag.model';
import {patch} from '@ngxs/store/operators';
import FetchProductsTags = TagActions.FetchProductsTags;
import {ProductTagModel} from '../../models/Products/product-tag.model';


@State<TagStateModel>({
  name: 'tags',
  defaults: {
    subCategoriesTags: null,
    productsTags: null
  }
})
@Injectable()
export class TagState {
  constructor(private tagService: TagService) {
  }

  @Selector()
  static SubCategoriesTags(state: TagStateModel) {
    return state.subCategoriesTags;
  }

  @Selector()
  static ProductsTags(state: TagStateModel) {
    return state.productsTags;
  }

  @Action(FetchSubCategoriesTags)
  fetchSubCategoriesTags(ctx: StateContext<TagStateModel>, action: FetchSubCategoriesTags) {
    return this.tagService.getSubCategoriesTags().pipe(
      tap((tags: SubCategoryTagModel[]) => {
        ctx.setState(patch({
          subCategoriesTags: tags
        }));
      })
    );
  }

  @Action(FetchProductsTags)
  fetchProductsTags(ctx: StateContext<TagStateModel>, action: FetchProductsTags) {
    return this.tagService.getProductsTags().pipe(
      tap((tags: ProductTagModel[]) => {
        ctx.setState(patch({
          productsTags: tags
        }));
      })
    );
  }

  @Action(ClearTags)
  clearTags(ctx: StateContext<TagStateModel>, action: ClearTags) {
    ctx.setState({
      subCategoriesTags: null,
      productsTags: null
    });
  }


}
