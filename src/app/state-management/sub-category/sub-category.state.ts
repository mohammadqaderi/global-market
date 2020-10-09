import {Action, Selector, State, StateContext, Store} from '@ngxs/store';
import {SubCategoryActions, SubCategoryStateModel} from './sub-category.actions';
import {Injectable} from '@angular/core';
import {SubCategoryService} from '../../services/category/sub-category.service';
import FetchAllSubCategories = SubCategoryActions.FetchAllSubCategories;
import {tap} from 'rxjs/operators';
import {SubCategoryModel} from '../../models/Categories/sub-category.model';
import ClearSubCategory = SubCategoryActions.ClearSubCategory;
import {CategoryService} from '../../services/category/category.service';
import FetchSubCategoriesByTagName = SubCategoryActions.FetchSubCategoriesByTagName;
import {ProductActions} from '../product/product.actions';
import UpdateShopProducts = ProductActions.UpdateShopProducts;


@State<SubCategoryStateModel>({
  name: 'subCategories',
  defaults: {
    subCategories: null
  }
})
@Injectable()
export class SubCategoryState {
  constructor(private subCategoryService: SubCategoryService, private categoryService: CategoryService,
              private store: Store) {
  }

  @Selector()
  static SubCategories(state: SubCategoryStateModel) {
    return state.subCategories;
  }


  @Action(FetchSubCategoriesByTagName)
  fetchSubCategoriesByTagName(ctx: StateContext<SubCategoryStateModel>, action: FetchSubCategoriesByTagName) {
    return this.subCategoryService.getSubCategoriesByTagName(action.tagName).pipe(
      tap((subCategories: SubCategoryModel[]) => {
        let products = [];
        for (let i = 0; i < subCategories.length; i++) {
          const subCategory = Object.assign({}, subCategories[i]);
          products = products.concat(subCategory.products.slice(0, 5));
        }
        this.store.dispatch(new UpdateShopProducts(products));
      })
    );
  }

  @Action(FetchAllSubCategories)
  fetchAllSubCategories(ctx: StateContext<SubCategoryStateModel>, action: FetchAllSubCategories) {
    return this.subCategoryService.getAllSubCategories().pipe(
      tap((data: SubCategoryModel[]) => {
        ctx.setState({
          subCategories: data
        });
      })
    );
  }


  @Action(ClearSubCategory)
  clearSubCategories(ctx: StateContext<SubCategoryStateModel>, action: ClearSubCategory) {
    ctx.setState({
      subCategories: null
    });
  }

}
